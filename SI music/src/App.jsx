import { useEffect, useState } from 'react'
import './App.css'
import { postFp, setUserInfo } from './actions/fingerPrint'
import Navbar from './components/Navbar/Navbar';
import Main from './components/Main/Main';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import {BrowserRouter, Navigate, Route, Routes, json} from "react-router-dom";
import Login from './components/authorisation/Login';


function App() {
    const [user, setUser] = useState({name: '', fpKey: ''})
    const [load, setLoad] = useState('')
    useEffect(() => {
        const setFp = async () => {
            const fp = await FingerprintJS.load();
            let visitorId = await fp.get({extendedResult: true});
            let key = ''
            for (key in visitorId.components){
                delete visitorId.components[key].duration
                if (visitorId.components[key].value === undefined){
                    delete visitorId.components[key]
                }
            }
            const response = await postFp(visitorId.components);
            if (response.status === 200){
                if(response.data.user){
                    setUser({fpKey: response.data.user[0].fp, name: response.data.user[0].username})
                    
                    setLoad('login')
                }
                else{
                    const fpPreHash = String(response.data.response.fp)
                    setUser({...user, fpKey: fpPreHash})
                    setLoad('registrate')
                }
            }
        };
        setFp();

    }, []);

    useEffect(() => {
        const reduce = async () => {
            if(load === 'registrate'){
                const response = await setUserInfo('', user.fpKey)
                alert(`fp: ${user.fpKey}`)
                setLoad('')
            }
            if(load === 'login'){
                alert(`fp: ${user.fpKey}`)
                setLoad('')
            }
        }
        reduce();
    }, [load])

    return (
        <div>
            <BrowserRouter>
                <Navbar name={user.name? user.name : 'Как вас зовут?'}/>
                
                <Routes>
                    <Route path="/" Component={Main}/>
                    <Route path="/login" element={<Login fp={user.fpKey} changeName={setUser}/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App

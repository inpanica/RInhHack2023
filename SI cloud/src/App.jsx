import { useEffect, useState } from 'react'
import '../src/App.css'
import { postFp, setUserInfo } from '../src/actions/fingerPrint'
import Navbar from '../src/components/Navbar/Navbar';
import Main from '../src//components/Main/Main';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import {BrowserRouter, Navigate, Route, Routes, json} from "react-router-dom";
import Login from '../src/components/authorisation/Login';
import axios from 'axios';


function App() {
    const [user, setUser] = useState({name: '', fpKey: ''})
    const [fileList, setFileList] = useState([])
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
            delete visitorId.components.canvas
            delete visitorId.components.screenResolution
            console.log(visitorId.components);
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
                const resp = await axios.post('http://190.115.29.135/fileapi/file/downloaddelete/', {
                    fp: user.fpKey,
                    delete: 'no',
                    link: ''
                })
                setFileList(Object.entries(resp.data.response))
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
                    <Route path="/" element={<Main fp={user.fpKey} fileList={fileList} setFileList={setFileList}/>}/>
                    <Route path="/login" element={<Login fp={user.fpKey} changeName={setUser}/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App

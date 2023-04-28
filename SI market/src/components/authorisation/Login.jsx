import React, { useState } from 'react';
import './Login.less'
import Input from '../Input/Input';
import Button from '../Button/Button'
import { setUserInfo } from '../../actions/fingerPrint';
import { useNavigate } from 'react-router';

const Login = ({fp, changeName, ...props}) => {
    const [name, setName] = useState('')

    const navigate = useNavigate()

    const send = async () => {
        const response = await setUserInfo(name, fp)
        changeName({name: response.data.response.username, fpKey: response.data.response.fp})
        navigate('/')
    }

    return (
        <div className={'login'}>
            <div className='desc'>Изменить имя</div>
            <Input type="text" placeholder="Как вас зовут?" value={name} setValue={setName}/>
            <Button className="registration__button button" onClick={send}>Сохранить</Button>
        </div>
    );
};

export default Login;
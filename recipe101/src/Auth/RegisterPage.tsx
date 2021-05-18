import React, {useState} from 'react'
import { onRegister } from './auth.api';
import { AuthForm } from './Auth.components';



const RegisterPage = () => {

    const [{username, password, repeatePassword}, setRegisterData] =useState({
        username: '',
        password: '',
        repeatePassword: ''
    })

    const [error, seterror] = useState('')

    const register = async (event: React.FormEvent) => {
        event.preventDefault();
        if(password === repeatePassword) {
            //perform API call
            const response = await onRegister({
                username,
                password,
            })

            if(response && response.error) {
                seterror(response.error)
            }
        } else {
            seterror('password and repeat password must match')
        }
        
    }


    return (
        <AuthForm onSubmit={register}>
            <label htmlFor="username">Username</label>
            <input value={username} name="username" onChange={(event) => setRegisterData({
                username: event.target.value,
                password,
                repeatePassword
            })}/>
            <label htmlFor="password">Password</label>
            <input value={password} name="password" type="password" onChange={(event) => setRegisterData({
                username,
                password: event.target.value,
                repeatePassword
            })}/>
            <label htmlFor="repeatPassword">Repeat password</label>
            <input value={repeatePassword} type="password" name="repeatPassword" onChange={(event) => setRegisterData({
                username,
                password,
                repeatePassword : event.target.value,
            })}/>
            <button type='submit'>Register</button>
            {error.length >0 && <p>{error}</p>}
        </AuthForm>
    );
}

export default RegisterPage;
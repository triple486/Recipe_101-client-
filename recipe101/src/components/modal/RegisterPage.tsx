import React, {useState} from 'react'
import { Link, withRouter } from "react-router-dom";
import { AuthForm } from '../../Auth/Auth.components';



const RegisterPage = () => {

    const [{username, password, email, mobile}, setRegisterData] =useState({
        username: '',
        password: '',
        email: '',
        mobile: '',
    })

    const [error, seterror] = useState('')




    return (
        <AuthForm>
            <label htmlFor="username">Username</label>
            <input value={username} name="username" onChange={(event) => setRegisterData({
                username: event.target.value,
                password,
                email,
                mobile,
            })}/>
            <label htmlFor="password">Password</label>
            <input value={password} name="password" type="password" onChange={(event) => setRegisterData({
                username,
                password: event.target.value,
                email,
                mobile,
            })}/>
            <label htmlFor="repeatPassword">Repeat password</label>
            <label htmlFor="email">Email</label>
            <input value={email} type="email" name="email" onChange={(event) => setRegisterData({
                username,
                password,
                email: event.target.value,
                mobile,
            })}/>
            <label htmlFor="mobile">Mobile</label>
            <input value={mobile} type="tel" name="mobile" onChange={(event) => setRegisterData({
                username,
                password,
                email,
                mobile: event.target.value,
            })}/>
            <button type='submit'>Register</button>
            {error.length >0 && <p>{error}</p>} 
            <p>Already have an account? <Link to="/login">Login</Link></p>
        </AuthForm>
    );
}

export default withRouter(RegisterPage)
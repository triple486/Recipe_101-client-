
import React,{ useState } from 'react'
import { Link, withRouter } from "react-router-dom";
import { Body, Overlay, Popup, Popup_close, Avatar, Img, Header, Element, Label, Input, Button } from '../../ui/LoginPage';
import { onLogin } from '../../Auth/auth.api'
import { AuthForm } from '../../Auth/Auth.components'


interface LoginPageProps {
  show: boolean;
  close: () => void;
}

const LoginPage : React.FC<LoginPageProps>  = ({show, close}) => {

  const [{username,password}, setCredentials] = useState({
    username: '',
    password: '',
  })

  const [error, setError] = useState('');

  const login = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await onLogin({
      username,
      password,
    })

    if(response && response.error) {
        setError(response.error)
    }
  } 

  const openLoginForm = () => {
    document.body.classList.add("showLoginForm")
  }

  const closeLoginForm = () => {
    document.body.classList.remove("showLoginForm")
  }

  // return (
  //   <AuthForm onSubmit={login}>
  //       <label htmlFor="username">Username</label>
  //       <input placeholder="Username" value={username} onChange={(event) => setCredentials({
  //           username: event.target.value,
  //           password
  //       })}/>
  //       <label htmlFor="password">Password</label>
  //       <input placeholder="Password" type="password" value={password} onChange={(event) => setCredentials({
  //           username,
  //           password: event.target.value,
  //       })} />
  //       <Button type="submit">Login</Button>
  //       <p>Need an account? <Link to="/register">Register now!</Link></p>
  //   </AuthForm>
  // )

  // return (
  //   <>
  //   <div className="center">
  //     <button className="show-login">Login</button>
  //   </div>
  //   <div className="popup">
  //     <div className="close-btn">&times;</div>
  //     <div className="form">
  //       <h2>Log in</h2>
  //       <div className="form-element">
  //         <label htmlFor="email">Email</label>
  //         <input type="text" id="email" placeholder="Enter email" />
  //       </div>
  //       <div className="form-element">
  //         <label htmlFor="password">Password</label>
  //         <input type="password" id="password" placeholder="Enter password" />
  //       </div>
  //       <Button type="submit">Login</Button>
  //       <p>Need an account? <Link to="/register">Register now!</Link></p>
  //     </div>
  //   </div>
  //   </>
  // )

  return (
    <Body style={{  
      opacity: show ? "1" : "0"
      }}>
      <Overlay></Overlay>
      <Popup >
        <Popup_close onClick={close}>&times;</Popup_close>
        <div className="form">
          <Avatar>
            <Img src="https://bit.ly/31pHqJb" alt="" />
          </Avatar>
          <Header>
            Member login
          </Header>
          <Element>
            <Label className="username">Username</Label>
            <Input type="text" className="username"/>
          </Element>
          <Element>
            <Label className="password">Password</Label>
            <Input type="password" className="password"/>
          </Element>
          <Element>
            <Button>Login</Button>
          </Element>
          <p>Need an account? <Link to="/register">Register now!</Link></p>
        </div>
      </Popup>
    </Body>
  )


}


export default LoginPage
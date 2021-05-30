import { Route, Switch, useHistory, useLocation, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { storeToken } from "../../redux/tokenReducer";
import { updateLogin, updateUserInfo } from "../../redux/userReducer";
import styled from "styled-components";
import axios from "axios";
import React, { useState } from "react";
import { isOn } from "../../redux/modalReducer";
import Input from "../Input";
import CancelButton from "../CancelButton";
import kakaobutton from "../../icon/kakao_login_medium_narrow.png";
axios.defaults.withCredentials = true;
const Frame = styled.div`
  height: 320px;
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  border: solid 1px red;
`;
const Line = styled.div`
  flex: 1 0 0;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const Kakaobutton = styled.img`
  border-radius: 12px;
  display: flex;
  height: 70%;

  border: solid 1px black;
  box-shadow: 0px 0px 1px 1px black;
`;

const Loginbutton = styled.button`
  border-radius: 12px;
  width: 163.45px;
  height: 70%;
  font-size: 15px;
  align-items: center;
  justify-content: center;
  display: flex;
  border: solid 1px black;
  box-shadow: 0px 0px 1px 1px black;
`;
const TextBox = styled.span`
  font-size: 15px;
  display: flex;
`;

function Login() {
  const dispatch = useDispatch();
  let history = useHistory();
  const [name, namef] = useState("");
  const [password, passwordf] = useState("");

  const Tologin = () => {
    let cmd = `${process.env.REACT_APP_SERVER_URL}/signin`;
    return axios
      .post(cmd, { username: name, password: password })
      .then((res) => {
        namef("");
        passwordf("");
        dispatch(storeToken(res.data.data.accessToken));
        dispatch(updateLogin(true));
        dispatch(updateUserInfo(res.data.data.userinfo));
        dispatch(isOn(false));
        history.push("/");
      })
      .catch((err) => {});
  };

  return (
    <Frame>
      <CancelButton
        Cancel={() => {
          dispatch(isOn(false));
          history.push("/");
        }}
      />
      <Input label={"username"} type={"text"} value={name} func={namef}></Input>
      <Input
        label={"password"}
        type={"password"}
        value={password}
        func={passwordf}
      ></Input>
      <Line>
        <Loginbutton
          onClick={() => {
            Tologin();
          }}
        >
          <TextBox>로그인</TextBox>
        </Loginbutton>
      </Line>
      <Line>
        <Kakaobutton
          src={kakaobutton}
          onClick={() => {
            let url =
              `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_REST_API_KEY}` +
              `&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}` +
              `&response_type=code`;
            window.location.assign(url);
          }}
        ></Kakaobutton>
      </Line>
      <Line>
        <Link to={"/resister"}> 아직 계정이 없으십니까?</Link>
      </Line>
    </Frame>
  );
}

export default Login;

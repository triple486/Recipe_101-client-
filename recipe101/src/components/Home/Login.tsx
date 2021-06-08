import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { storeToken } from "../../redux/tokenReducer";
import { updateLogin, updateUserInfo } from "../../redux/userReducer";
import styled from "styled-components";
import axios from "axios";
import { useState } from "react";
import { isOn } from "../../redux/modalReducer";
import kakaobutton from "../../icon/kakao_login_medium_wide.png";
import logo from "../../icon/logo2.png";
import CancelButton from "../CancelButton";

axios.defaults.withCredentials = true;

const Line = styled.div`
  flex: 1 0 0;
  height: 20px;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const Popup = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1.15);
  width: 300px;
  height: 450px;
  background: #f5f5f5;
  z-index: 2;
  box-shadow: 5px 5px 3px rgba(0, 0, 0, 0.2);
  transition: transform 300ms ease-in-out, opacity 300ms ease-in-out;
  border-radius: 5px;
`;

const Avatar = styled.img`
  margin: 5px;
  text-align: center;
  width: 200px;
`;

const Header = styled.div`
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  color: #222;
  margin: 20px 0px;
`;

const Element = styled.div`
  padding: 8px 20px;
`;

const Label = styled.div`
  display: block;
  font-size: 14px;
  color: #222;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px 10px;
  box-sizing: border-box;
  outline: none;
  border: 1px solid #aaa;
  background: #eee;
  border-radius: 5px;
`;

const LoginBtn = styled.button`
  margin-top: 5px;
  width: 100%;
  padding: 10px 0px;
  text-transform: uppercase;
  outline: none;
  border: none;
  font-size: 15px;
  font-weight: 600;
  border-radius: 5px;
  cursor: pointer;
  background: #b17d55;
  color: #f5f5f5;
`;

const LoginBtn2 = styled.button`
  width: 100%;
  padding: 10px 0px;
  text-transform: uppercase;
  outline: none;
  border: none;
  font-size: 15px;
  font-weight: 600;
  border-radius: 5px;
  cursor: pointer;
  background: #b17d55;
  color: #f5f5f5;
`;

const KakaoBtn = styled.img`
  margin-top: 5px;
  width: 100%;
  outline: none;
  border: none;
`;

interface userInfo {
  username: string;
  password: string;
}

const Login = () => {
  const [userInfo, setUserInfo] = useState<userInfo>({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  let location = useLocation();
  let path = location.pathname.slice(0, -6);
  console.log(path, location.pathname);
  let history = useHistory();
  let [err, seterr] = useState("");

  const Tologin = () => {
    let cmd = `${process.env.REACT_APP_SERVER_URL}/signin`;
    return axios
      .post(cmd, { username: userInfo.username, password: userInfo.password })
      .then((res) => {
        setUserInfo({ ...userInfo, username: "" });
        setUserInfo({ ...userInfo, password: "" });
        dispatch(storeToken(res.data.data.accessToken));
        dispatch(updateLogin(true));
        dispatch(updateUserInfo(res.data.data.userinfo));
        dispatch(isOn(false));
        history.push(path.length ? path : "/");
      })
      .catch((err) => {
        seterr(
          err.response && err.response.data ? err.response.data.message : ""
        );
      });
  };

  return (
    <Popup>
      <CancelButton
        Cancel={() => {
          dispatch(isOn(false));
          history.push(path.length ? path : "/");
        }}
      ></CancelButton>
      <Line>
        <Avatar src={logo} />
      </Line>
      <Header>Member login</Header>
      <Element>
        <Label className="username">Username</Label>
        <Input
          type="text"
          id="username"
          value={userInfo.username}
          onChange={(event: any) =>
            setUserInfo({ ...userInfo, username: event.target.value })
          }
        />
      </Element>
      <Element>
        <Label className="password">Password</Label>
        <Input
          type="password"
          className="password"
          value={userInfo.password}
          onChange={(event: any) =>
            setUserInfo({ ...userInfo, password: event.target.value })
          }
        />
      </Element>
      <Line>{err.length ? err : null}</Line>
      <Element>
        <LoginBtn onClick={() => Tologin()}>로그인</LoginBtn>
        <KakaoBtn
          className="kakao-btn"
          src={kakaobutton}
          onClick={() => {
            let url =
              `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_REST_API_KEY}` +
              `&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}` +
              `&response_type=code`;
            window.location.assign(url);
          }}
        ></KakaoBtn>
        <LoginBtn2
          onClick={() => {
            history.push(path.length ? path + "/resister" : "/resister");
          }}
        >
          회원가입
        </LoginBtn2>
      </Element>
    </Popup>
  );
};

export default Login;

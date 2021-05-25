import { Route, Switch, useHistory, useLocation, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { storeToken } from "../redux/tokenReducer";
import styled from "styled-components";
import axios from "axios";
import React, { useState } from "react";
import Modal from "./Modal";
import Input from "./Input";
const Frame = styled.div`
  height: 40%;
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: solid 1px red;
`;
const Line = styled.div`
  flex: 1 0 0;
`;

function Login() {
  const dispatch = useDispatch();
  let history = useHistory();
  const [name, namef] = useState("");
  const [password, passwordf] = useState("");

  const Tologin = () => {
    let cmd = `https://server.recipe101.tk/signin`;
    return axios
      .post(cmd, { username: name, password: password })
      .then((res) => {
        namef("");
        passwordf("");
        dispatch(storeToken(res.data.data.accessToken));
        history.push("/");
      })
      .catch((err) => {});
  };

  return (
    <Modal>
      <Frame>
        <Input
          label={"username"}
          type={"text"}
          value={name}
          func={namef}
        ></Input>
        <Input
          label={"password"}
          type={"password"}
          value={password}
          func={passwordf}
        ></Input>
        <Line>
          <button
            onClick={() => {
              Tologin();
            }}
          >
            ok
          </button>
          <button
            onClick={() => {
              namef("");
              passwordf("");

              history.push("/");
            }}
          >
            cancel
          </button>
        </Line>
        <Line>
          <Link to={"/resister"}> 아직 계정이 없으십니까?</Link>
        </Line>
      </Frame>
    </Modal>
  );
}

export default Login;

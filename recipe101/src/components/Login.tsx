import { Route, Switch, useHistory, useLocation, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { storeToken } from "../redux/tokenReducer";
import styled from "styled-components";
import Modal from "./Modal";
const Frame = styled.div`
  height: 40%;
  width: 40%;
  display: flex;
  border: solid 1px red;
`;

function Login() {
  const dispatch = useDispatch();
  let history = useHistory();
  return (
    <Modal>
      <Frame>
        <button
          onClick={() => {
            history.push("/");
          }}
        >
          back
        </button>
        <button
          onClick={() => {
            history.push("/resister");
          }}
        >
          resister
        </button>

        <button
          onClick={() => {
            dispatch(storeToken("itis dummy token"));
          }}
        >
          storetoken
        </button>
      </Frame>
    </Modal>
  );
}

export default Login;

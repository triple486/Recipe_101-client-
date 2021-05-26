import styled from "styled-components";
import {
  Route,
  Switch,
  useHistory,
  useLocation,
  Link,
  Redirect,
} from "react-router-dom";
import Login from "./Login";
import Resister from "./Resister";

const Modal = styled.div`
  height: 100vh;
  width: 100vw;
  z-index: 2;
  top: 0;
  left: 0;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Modal;

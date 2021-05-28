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

const Frame = styled.div`
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

function Modal() {
  return (
    <Frame>
      <Switch>
        <Route path={"/login"}>
          <Login></Login>
        </Route>
        <Route path={"/resister"}>
          <Resister></Resister>
        </Route>
      </Switch>
    </Frame>
  );
}

export default Modal;

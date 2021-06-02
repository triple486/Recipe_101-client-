import styled from "styled-components";
import { Route, Switch, useLocation } from "react-router-dom";
import Login from "./Login";
import Resister from "./Resister";

const Frame = styled.div`
  height: 100vh;
  width: 100vw;
  // z-index: 2;
  top: 0;
  left: 0;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Modal() {
  let location = useLocation();
  console.log(location.pathname);
  return (
    <Frame>
      <Switch>
        <Route path={"/recipe/:id/login"}>
          <Login></Login>
        </Route>
        <Route path={"/recipe/:id/resister"}>
          <Resister></Resister>
        </Route>
        <Route path={"/search/:id/login"}>
          <Login></Login>
        </Route>
        <Route path={"/search/:id/resister"}>
          <Resister></Resister>
        </Route>
        <Route path={"/search/login"}>
          <Login></Login>
        </Route>
        <Route path={"/search/resister"}>
          <Resister></Resister>
        </Route>
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

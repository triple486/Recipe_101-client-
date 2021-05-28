import React, { useState } from "react";
import {
  Route,
  Switch,
  useHistory,
  useLocation,
  Link,
  Redirect,
} from "react-router-dom";
import styled from "styled-components";
import Addrecipe from "./components/Addrecipe";
import Landingpage from "./components/Landingpage";
import Mypage from "./components/Mypage";

const Main = styled.div`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    z-index: 0;
  }
  dispaly: flex;
  position: fixed;
  top: 0;
  left: 0;

  height: 100vh;
  width: 100vw;
`;

function App() {
  console.log(process.env);
  return (
    <Main>
      <Switch>
        <Route exact path="/addrecipe">
          <Addrecipe></Addrecipe>
        </Route>
        <Route exact path="/mypage">
          <Mypage></Mypage>
        </Route>

        <Route path="/">
          <Landingpage></Landingpage>
        </Route>
      </Switch>
    </Main>
  );
}

export default App;

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
import Home from "./components/Home";
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
  return (
    <Main>
      <Switch>
        <Route exact path="/Addrecipe" component={Addrecipe}></Route>
        <Route exact path="/Mypage" component={Mypage}></Route>
        <Route path="/" component={Home}></Route>
      </Switch>
    </Main>
  );
}

export default App;

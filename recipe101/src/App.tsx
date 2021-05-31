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

// 페이지가 고정되고 스크롤이 안되서 아래 css값들 제외 - 인택님께 논의 및 확정하기
// 움짤영역은 이미지와 설명을 번갈아 나열하는 방식으로 만들어 랜딩페이지에 추가하기
// 전체 css 수정하기
const Main = styled.div`
  display: flex;
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

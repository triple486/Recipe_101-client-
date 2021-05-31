import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Route,
  Switch,
  useHistory,
  useLocation,
  Link,
  Redirect,
  useRouteMatch,
} from "react-router-dom";
import { storeToken } from "../redux/tokenReducer";
import styled from "styled-components";
import Maingrid from "./Maingrid";
import Mainslide from "./Mainslide";
import { useSelector } from "react-redux";
import { RootState } from "../redux/reducers";
import Login from "./Login";
import Resister from "./Resister";
import Searchbar from "./Searchbar";
import Searchresult from "./Searchresult";
import Mainintro from "./Mainintro";
import axios from "axios";
//axios.defaults.withCredentials = true;
const Frame = styled.div`
  flex: 1 0 0;
  min-height: 100%;
  // width: 100%;
  display: flex;
  flex-direction: column;
  border: solid 1px red;
`;

const MainBody = styled.div`
  height: 100%;
  width: 100%;
  flex: 1;
  border: solid 1px red;
  overflow-y: scroll;
`;

function Landingpage() {
  const dispatch = useDispatch();
  let { path, url } = useRouteMatch();
  let history = useHistory();
  const nurl = new URL(window.location.href);
  const target = nurl.pathname;
  const code = nurl.searchParams.get("code");
  if (code) {
    axios
      .post(process.env.REACT_APP_SERVER_URL + target, { code })
      .then((res) => {
        dispatch(storeToken(res.data.data.accessToken));
        history.push("/");
      })
      .catch();
  }

  let data = useSelector((state: RootState) => state.searchReducer);
  let isSearch = data.isSearch;
  return (
    <Frame>
      <Searchbar></Searchbar>
      {isSearch ? (
        <Searchresult></Searchresult>
      ) : (
        <MainBody>
          <Mainslide></Mainslide>
          <Maingrid></Maingrid>
          <Mainintro></Mainintro>
        </MainBody>
      )}
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

export default Landingpage;

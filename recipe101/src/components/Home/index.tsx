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
import { storeToken } from "../../redux/tokenReducer";
import styled from "styled-components";
import Main from "./Main";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import Modal from "./Modal";
import Searchbar from "./Searchbar";
import Searchresult from "./Searchresult";
import axios from "axios";
//axios.defaults.withCredentials = true;
const Frame = styled.div`
  flex: 1 0 0;
  min-height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  border: solid 1px red;
`;

const MainBody = styled.div`
  min-height: 100%;
  width: 100%;
  flex: 1;
  border: solid 1px red;
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
  let Modalon = useSelector((state: RootState) => state.modalReducer);
  let isSearch = data.isSearch;
  return (
    <Frame>
      <Searchbar></Searchbar>
      <Switch>
        <Route path={"/search"} component={Searchresult}></Route>
        <Route path={"/"} component={Main}></Route>
      </Switch>
      {Modalon ? <Modal></Modal> : null}
    </Frame>
  );
}

export default Landingpage;

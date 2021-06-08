import { useDispatch } from "react-redux";
import { Route, Switch, useHistory } from "react-router-dom";
import { storeToken } from "../../redux/tokenReducer";
import styled from "styled-components";
import Main from "./Main";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import { updateLogin, updateUserInfo, iskakao } from "../../redux/userReducer";
import { isOn } from "../../redux/modalReducer";
import Modal from "./Modal";
import Searchbar from "./Searchbar";
import Searchresult from "./Searchresult";
import axios from "axios";
import { useEffect } from "react";
axios.defaults.withCredentials = true;
const Frame = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #ffe894e6;
`;

const InnerFrame = styled.div`
  flex: 1 0 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #b17d55;
`;

function Landingpage() {
  const dispatch = useDispatch();
  let history = useHistory();
  const nurl = new URL(window.location.href);
  const target = nurl.pathname;
  const code = nurl.searchParams.get("code");
  if (code) {
    axios
      .post(process.env.REACT_APP_SERVER_URL + target, { code })
      .then((res) => {
        dispatch(storeToken(res.data.data.accessToken));
        dispatch(updateLogin(true));
        dispatch(iskakao(true));
        dispatch(updateUserInfo(res.data.data.userinfo));
        dispatch(isOn(false));
        history.push("/");
      })
      .catch();
  }
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_SERVER_URL + "/refresh")
      .then((res) => {
        dispatch(storeToken(res.data.data.accessToken));
        dispatch(updateLogin(true));
        dispatch(updateUserInfo(res.data.data.userinfo));
      })
      .catch();

    return;
  }, [dispatch]);

  let Modalon = useSelector((state: RootState) => state.modalReducer);
  return (
    <Frame>
      <Searchbar></Searchbar>
      <InnerFrame>
        <Switch>
          <Route path={"/search"} component={Searchresult}></Route>
          <Route path={"/"} component={Main}></Route>
        </Switch>
      </InnerFrame>
      {Modalon ? <Modal></Modal> : null}
    </Frame>
  );
}

export default Landingpage;

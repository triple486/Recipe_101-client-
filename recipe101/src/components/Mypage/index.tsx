import styled from "styled-components";
import { useHistory, Switch, Route, useLocation } from "react-router-dom";
import Main from "./Main";
// import Profile from "./Pages/Profile";
import { RootState } from "../../redux/reducers";
import { useSelector, useDispatch } from "react-redux";
import { updateUserInfo } from "../../redux/userReducer";
import Password from "./Pages/Password";
import Profile from "./Pages/PageModify";
import Comment from "./Pages/AddedComment";
import Recipe from "./Pages/AddedRecipe";
import Store from "./Pages/StoreRecipe";
import Subscribe from "./Pages/Subscribe";
import axios from "axios";
import { useState } from "react";
axios.defaults.withCredentials = true;
const Frame = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  overflow-y: scroll;
`;

const Header = styled.div`
  height: 100px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-bottom: solid 1px black;
`;
const InnerHeader = styled.div`
  height: 100%;
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
`;

const Button = styled.button`
  height: 30px;
  width: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const TextBox = styled.div`
  display: flex;
`;

export default function Mypage() {
  let history = useHistory();
  let location = useLocation();
  let dispatch = useDispatch();
  let [load, setload] = useState(false);
  let accessToken = useSelector((state: RootState) => state.tokenReducer);
  let user = useSelector((state: RootState) => state.userReducer);
  const config = {
    headers: {
      authorization: "bearer " + accessToken,
    },
  };
  if (!load) {
    axios
      .get(process.env.REACT_APP_SERVER_URL + `/user`, config)
      .then((rst) => {
        dispatch(updateUserInfo(rst.data.data.userinfo));
        setload(true);
      });
  }
  return (
    <Frame>
      <Header>
        <InnerHeader>
          <Button
            onClick={() => {
              if (location.pathname === "/mypage") {
                history.push("/");
              } else {
                history.push("/mypage");
              }
            }}
          >
            <TextBox>{`돌아가기`}</TextBox>
          </Button>
        </InnerHeader>
      </Header>
      <Switch>
        <Route path={"/mypage/subscribe"} component={Subscribe}></Route>
        <Route path={"/mypage/addedrecipe"} component={Recipe}></Route>
        <Route path={"/mypage/addedcomment"} component={Comment}></Route>
        <Route path={"/mypage/storerecipe"} component={Store}></Route>
        <Route path={"/mypage/password"} component={Password}></Route>
        <Route path={"/mypage/profile"} component={Profile}></Route>
        <Route path={"/mypage/"} component={Main}></Route>
      </Switch>
    </Frame>
  );
}

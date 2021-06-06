import styled from "styled-components";
import { useHistory, Switch, Route, useLocation } from "react-router-dom";
import Main from "./Main";
// import Profile from "./Pages/Profile";
import { RootState } from "../../redux/reducers";
import { useSelector, useDispatch } from "react-redux";
import { updateUserInfo, updateLogin } from "../../redux/userReducer";
import { storeToken } from "../../redux/tokenReducer";
import Password from "./Pages/Password";
import Profile from "./Pages/PageModify";
import Comment from "./Pages/AddedComment";
import Recipe from "./Pages/AddedRecipe";
import Store from "./Pages/StoreRecipe";
import Subscribe from "./Pages/Subscribe";
import axios from "axios";
import { useEffect } from "react";
axios.defaults.withCredentials = true;
const Frame = styled.div`
  background-color: #b17d55;
  color: white;
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
  border-bottom: solid 1px white;
`;
const InnerHeader = styled.div`
  height: 100%;
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Button = styled.button`
  background-color: #b17d55;
  border: solid 1px #dfdfdf;
  color: white;
  padding: 16px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
  cursor: pointer;

  &:hover {
    border: solid 1px white;
    background-color: white;
    opacity: 0.7;
    color: black;
  }
`;
const TextBox = styled.div`
  display: flex;
`;
const Title = styled.div`
  display: flex;
  width: 900px;
  margin-left: 80px;
`;

export default function Mypage() {
  let history = useHistory();
  let location = useLocation();
  let dispatch = useDispatch();
  let accessToken = useSelector((state: RootState) => state.tokenReducer);
  const config = {
    headers: {
      authorization: "bearer " + accessToken,
    },
  };

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_SERVER_URL + "/refresh")
      .then((res) => {
        dispatch(storeToken(res.data.data.accessToken));
        dispatch(updateLogin(true));
        dispatch(updateUserInfo(res.data.data.userinfo));
      })
      .catch();
    axios
      .get(process.env.REACT_APP_SERVER_URL + `/user`, config)
      .then((rst) => {
        dispatch(updateUserInfo(rst.data.data.userinfo));
      });
    return;
  }, []);
  return (
    <Frame>
      <Header>
        <InnerHeader>
          <Title>
            <h1>마이페이지</h1>
          </Title>
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

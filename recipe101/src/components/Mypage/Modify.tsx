import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import { StructuredType } from "typescript";
import { Link, withRouter, Route, useHistory } from "react-router-dom";

import { updateLogin } from "../../redux/userReducer";
import PageModify from "./PageModify";
import axios from "axios";
import "../../ui_mypage/Modify.css";
import Input from "./Input";
import { userInfo } from "os";

export default function Modify() {
  let user = useSelector((state: RootState) => state.userReducer);
  console.log("userm", user);
  let userInfo = user.userInfo;
  let history = useHistory();
  let userLogin = user.isLogin;
  let dispatch = useDispatch();
  // const [user.is, userLoginf] = useState(true)
  return (
    <>
      <div className="Outline">
        <h1 className="text">Modify</h1>
        <div>
          <span>username : {userInfo.username}</span>
        </div>
        <div>
          <span>email : {userInfo.email}</span>
        </div>
        <div>
          <span>phone : {userInfo.phone}</span>
        </div>

        <button
          onClick={() => {
            history.push("/PageModify");
          }}
        >
          modify
        </button>
        <button
          onClick={() => {
            dispatch(updateLogin(false));
            history.push("/");

            // user.isLogin
            // userLoginf(false)
          }}
        >
          log out
        </button>
      </div>
      <Route exact path="/PageModify" component={PageModify} />
    </>
  );
}

import React, { useState } from "react";
import styled from "styled-components";
import { StructuredType } from "typescript";
import { Link, withRouter, useHistory } from "react-router-dom";
import "../../css/Mypage/MypageMain.css";
import Modify from "./Modify";
import PickedRecipe from "./PickedRecipe";
import AddedRecipe from "./AddedRecipe";
import MyReview from "./MyReview";
import { useSelector, useDispatch } from "react-redux";

import { updateLogin } from "../../redux/userReducer";

const Frame = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: scroll;
`;

// 중괄호 안 ctrl + spacebar 눌러서 확인
function MypageMain() {
  let history = useHistory();
  const [active, activef] = useState(false);
  const [AccessToken, TokenGetFunc] = useState("");
  // const [userInfo, userInfof] = useState({
  //   userName: "",
  //   email: "",
  //   phone: "",
  //   createdAt: "",
  // });
  return (
    <Frame>
      <div className="Outline">
        <h1 className="Logo">Recipe 101</h1>
        <div>
          <button className="Recipeaddbutton">레시피 추가</button>
          <button
            className="Logout"
            onClick={() => {
              history.push("/");
            }}
          >
            로그아웃
          </button>
        </div>
        <Modify></Modify>
        <PickedRecipe></PickedRecipe>
        <AddedRecipe></AddedRecipe>
        <MyReview></MyReview>
      </div>
    </Frame>
  );
}

export default MypageMain;

import React, { useState } from "react";
import styled from "styled-components";
import { StructuredType } from "typescript";
import { Link, withRouter, useHistory, Switch, Route } from "react-router-dom";
import "../../css/Mypage/MypageMain.css";
import Modify from "./Modify";
import PickedRecipe from "./PickedRecipe";
import AddedRecipe from "./AddedRecipe";
import PageModify from "./PageModify";
import MyReview from "./MyReview";
import { useSelector, useDispatch } from "react-redux";

import { updateLogin } from "../../redux/userReducer";

const Frame = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: scroll;
`;

const InnerFrame = styled.div`
  height: 100%;
  width: 100%;
  max-width: 1200px;
`;
// 중괄호 안 ctrl + spacebar 눌러서 확인
function MypageMain() {
  let history = useHistory();

  return (
    <Frame>
      <InnerFrame>
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
              돌아가기
            </button>
          </div>
          <Modify></Modify>
          <PickedRecipe></PickedRecipe>
          <AddedRecipe></AddedRecipe>
          <MyReview></MyReview>
        </div>
      </InnerFrame>
    </Frame>
  );
}

export default MypageMain;

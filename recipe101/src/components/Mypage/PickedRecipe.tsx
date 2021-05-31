import React from "react";
import { StructuredType } from "typescript";
import { Link, withRouter } from "react-router-dom";
import Content from "./Content";
import "../../css/Mypage/MypageMain.css";
import "../../css/Mypage/PickedRecipe.css";
// interface PickedRecipeProps {
//   pagename: string;
//   mark: string;
// }

// 중괄호 안 ctrl + spacebar 눌러서 확인
function PickedRecipe() {
  return (
    <>
      <div className="Outline">
        <h1 className="text">PickedRecipe</h1>
        <div className="content">
          <Content></Content>
          <Content></Content>
          <Content></Content>
        </div>
      </div>
    </>
  );
}

export default PickedRecipe;

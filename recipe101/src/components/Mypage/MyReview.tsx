import React, { useState } from "react";
import { StructuredType } from "typescript";
import { Link, withRouter } from "react-router-dom";
import "../../css/Mypage/MypageMain.css";
import Content from "./Content";
import axios from "axios";

// 중괄호 안 ctrl + spacebar 눌러서 확인
function MyReview() {
  return (
    <>
      <div className="Outline">
        <h1 className="text">MyReview</h1>
        <div className="content">
          <Content></Content>
          <Content></Content>
          <Content></Content>
        </div>
      </div>
    </>
  );
}
MyReview.defaultProps = {
  mark: "!",
};
export default MyReview;

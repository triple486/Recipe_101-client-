import React from "react";
import { StructuredType } from "typescript";
import { Link, withRouter } from "react-router-dom";
import "../../css/Mypage/MypageMain.css";

// 중괄호 안 ctrl + spacebar 눌러서 확인
function Content() {
  return (
    <>
      <div className="content-pic">
        picture<div className="content-title">content-title</div>
        <div className="bottom-desc">desc</div>
      </div>
    </>
  );
}

export default Content;

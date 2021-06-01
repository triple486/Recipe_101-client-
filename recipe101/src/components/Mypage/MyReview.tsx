import React, { useState } from "react";

import { Link, withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/reducers";
import "../../css/Mypage/MypageMain.css";
import Content from "./Content";
import styled from "styled-components";
const Frame = styled.div`
  min-height: 300px
  width: 100%;
  display:flex;
  flex-wrap:wrap;

  align-items: center;
`;
// 중괄호 안 ctrl + spacebar 눌러서 확인
function MyReview() {
  let data = useSelector((state: RootState) => state.mypageReducer);
  return (
    <>
      <div className="Outline">
        <h1 className="text">MyReview</h1>
        <div className="content">
          <Frame>
            {data.comments?.length
              ? data.comments?.map((x, i) => {
                  return <Content key={i} data={x}></Content>;
                })
              : "비어있습니다."}
          </Frame>
        </div>
      </div>
    </>
  );
}
MyReview.defaultProps = {
  mark: "!",
};
export default MyReview;

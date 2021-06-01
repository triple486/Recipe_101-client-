import React from "react";
import { StructuredType } from "typescript";
import { Link, withRouter } from "react-router-dom";
import Content from "./Content";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/reducers";
import "../../css/Mypage/MypageMain.css";
import "../../css/Mypage/PickedRecipe.css";
import styled from "styled-components";
const Frame = styled.div`
  min-height: 300px
  width: 100%;
  display:flex;
  flex-wrap:wrap;
  align-items: center;
`;
function PickedRecipe() {
  let data = useSelector((state: RootState) => state.mypageReducer);
  console.log(data.stores);
  return (
    <>
      <div className="Outline">
        <h1 className="text">PickedRecipe</h1>
        <div className="content">
          <Frame>
            {data.stores?.length
              ? data.stores?.map((x, i) => {
                  return <Content key={i} data={x}></Content>;
                })
              : "비어있습니다."}
          </Frame>
        </div>
      </div>
    </>
  );
}

export default PickedRecipe;

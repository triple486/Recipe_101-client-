import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import { StructuredType } from "typescript";
import { Link, withRouter } from "react-router-dom";
import "../../ui_mypage/MypageMain.css";
import "../../ui_mypage/PickedRecipe.css";
import Content from "./Content";
import axios from "axios";

// 중괄호 안 ctrl + spacebar 눌러서 확인
function AddedRecipe() {
  let accessToken = useSelector((state: RootState) => state.tokenReducer);
  const fetchRecipe = () => {
    axios
      .get(`https://server.recipe101.tk/user/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {})
      .catch((e) => console.log("Error!"));
  };
  return (
    <>
      <div className="Outline">
        <h1 className="text">AddedRecipe</h1>
        <div className="content">
          <Content></Content>
          <Content></Content>
          <Content></Content>
        </div>
      </div>
    </>
  );
}

export default AddedRecipe;

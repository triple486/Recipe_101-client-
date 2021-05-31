import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import { StructuredType } from "typescript";
import { Link, withRouter, Route, useHistory } from "react-router-dom";
import "../../css/Mypage/MypageMain.css";
import axios from "axios";
import "../../css/Mypage/Modify.css";

import Input from "./Input";
import styled from "styled-components";
import Modify from "./Modify";
axios.defaults.withCredentials = true;
const InputArea = styled.div`
  display: flex;
  width: 40%;
  flex: 1 0 0;
  flex-direction: row;
`;

const ImageInput = styled.img`
  width: 100%;
  height: 100%;
  flex: 1 0 0;
  display: block;
`;
const TextInput = styled.div`
  flex: 1 0 0;
  display: flex;
  flex-direction: column;
`;

const Img = styled.img`
  height: 100px;
  width: 100px;
`;
const Imgbox = styled.div`
  height: 100px;
  width: 100px;
`;

function PageModify() {
  let accessToken = useSelector((state: RootState) => state.tokenReducer);
  let user = useSelector((state: RootState) => state.userReducer);
  let server = "https://server.recipe101.tk";
  let userInfo = user.userInfo;
  console.log("userInfo : ", userInfo);
  let usehistory = useHistory();

  // console.log(accessToken);

  const [newImage, setNewImage] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const onEdit = () => {
    // console.log(newImage);

    let data = new FormData();
    data.append("userImage", newImage[0]);
    data.append("userName", newUsername);
    data.append("phone", newPhone);
    data.append("email", newEmail);

    console.log(data.getAll("userImage"));
    console.log(data.get("userImage"));

    const uploadData = {
      usermage: newImage,
      userName: newUsername,
      phone: newPhone,
      email: newEmail,
    };

    if (
      Object.keys(uploadData).length > 0 &&
      uploadData.userName !== "" &&
      uploadData.email !== "" &&
      uploadData.phone !== ""
    ) {
      axios
        .patch("https://server.recipe101.tk/user", data, {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        })
        .then((res) => {
          console.log("res : ", res);

          usehistory.push("/");
        })
        .catch((e) => console.log(e));
    } else {
      alert("error!");
    }
  };
  return (
    <>
      <div className="Outline">
        <h1 className="text">Modify</h1>
        <form onSubmit={(e) => e.preventDefault()} id="editUserInfo">
          <h2>회원정보 수정</h2>
          {newImage.length ? (
            <Imgbox>
              <ImageInput
                src={
                  newImage.length ? URL.createObjectURL(newImage[0]) : newImage
                }
              ></ImageInput>
            </Imgbox>
          ) : (
            <Img
              src={
                userInfo.userimage
                  ? `${server}/image/${userInfo.userimage}`
                  : ""
              }
            ></Img>
          )}

          <InputArea>
            <TextInput>
              <Input
                label={"image"}
                type={"file"}
                value={newImage}
                // 기존 밸류를 원래 아이디의 정보로 넣고
                // 온체인지로 변경
                func={setNewImage}
                placeholder={""}
              ></Input>
              <Input
                label={"username"}
                type={"text"}
                value={newUsername}
                func={setNewUsername}
                placeholder={userInfo.username || ""}
              ></Input>
              <Input
                label={"phone"}
                type={"text"}
                value={newPhone}
                func={setNewPhone}
                placeholder={userInfo.phone || ""}
              ></Input>
              <Input
                label={"email"}
                type={"text"}
                value={newEmail}
                func={setNewEmail}
                placeholder={userInfo.email || ""}
              ></Input>
            </TextInput>
          </InputArea>

          <button
            onClick={() => {
              usehistory.push("/Mypage");
            }}
          >
            cancel
          </button>
          <button
            onClick={onEdit}
            // onClick={() => {
            // let data = new FormData();
            // data.append("")

            //   usehistory.push("/");
            // }}
          >
            적용하기
          </button>
        </form>
      </div>
    </>
  );
}
export default PageModify;

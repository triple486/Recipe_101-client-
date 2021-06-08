import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/reducers";
import { useHistory } from "react-router-dom";
import "../../../css/Mypage/MypageMain.css";
import axios from "axios";
import "../../../css/Mypage/Modify.css";
import Input from "../Input";
import styled from "styled-components";
import { updateUserInfo } from "../../../redux/userReducer";
axios.defaults.withCredentials = true;
const InputArea = styled.div`
  display: flex;
  width: 40%;
  flex: 1 0 1;
  flex-direction: row;
`;

const TextInput = styled.div`
  flex: 1 0 0;
  display: flex;
  flex-direction: column;
`;

const Frame = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const InnerFrame = styled.div`
  height: 100%;
  width: 100%;
  max-width: 1200px;
`;

const ImgInput = styled.input`
  height: 1px;
  width: 1px;
  margin: -1;
  cursor: pointer;
  overflow: hidden;
`;
const ImgLabel = styled.label<{ image: string }>`
  display: inline-box;
  flex: 1 0 1;
  height: 100px;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
  background-image: url(${({ image }) => image});
  background-size: cover;
  border: solid 1px white;
`;
const InputBox = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Button = styled.div`
background-color: #b17d55;
  border: solid 1px #dfdfdf;
  color: white;
  padding: 5px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 14px;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
  cursor: pointer;

  &:hover {
    border: solid 1px white;
    background-color: white;
    opacity: 0.7;
    color: black;

`;

function PageModify() {
  let accessToken = useSelector((state: RootState) => state.tokenReducer);
  let usehistory = useHistory();
  let dispatch = useDispatch();
  let user = useSelector((state: RootState) => state.userReducer);
  let userInfo = user.userInfo;

  const [newImage, setNewImage] = useState<File>();
  const [newUsername, setNewUsername] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [url, seturl] = useState(
    userInfo.userImage
      ? userInfo.userImage
      : process.env.REACT_APP_SERVER_URL + "/image/default.png"
  );

  const onEdit = () => {
    let data = new FormData();
    let k = 0;
    if (newImage) {
      data.append("userImage", newImage);
      k++;
    }
    if (newUsername.length) {
      data.append("userName", newUsername);
      k++;
    }
    if (newPhone.length) {
      data.append("phone", newPhone);
      k++;
    }
    if (newEmail.length) {
      data.append("email", newEmail);
      k++;
    }
    if (k) {
      axios
        .patch(process.env.REACT_APP_SERVER_URL + "/user", data, {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        })
        .then((res) => {
          return axios.get(process.env.REACT_APP_SERVER_URL + "/user", {
            headers: {
              Authorization: "Bearer " + accessToken,
            },
          });
        })
        .then((rst) => {
          dispatch(updateUserInfo(rst.data.data.userinfo));
          usehistory.push("/mypage");
        })
        .catch((e) => console.log(e));
    } else {
      alert("입력된 값이 없습니다.");
    }
  };
  return (
    <Frame>
      <InnerFrame>
        <div className="Outline">
          {/* <h1 className="text">Modify</h1> */}
          <form onSubmit={(e) => e.preventDefault()} id="editUserInfo">
            <h2>회원정보 수정</h2>
            <InputBox>
              <ImgLabel
                image={url}
                htmlFor={"aaaaa"}
                title={"클릭시 이미지 업로드가 가능합니다."}
              >
                <ImgInput
                  type={"file"}
                  onChange={(e) => {
                    if (e.target.files) {
                      seturl(URL.createObjectURL(e.target.files[0]));
                      setNewImage(e.target.files[0]);
                    }
                  }}
                  id={"aaaaa"}
                ></ImgInput>
              </ImgLabel>

              <InputArea>
                <TextInput>
                  <Input
                    label={"유저네임"}
                    type={"text"}
                    value={newUsername}
                    func={setNewUsername}
                    placeholder={userInfo.userName || ""}
                  ></Input>
                  <Input
                    label={"전화번호"}
                    type={"text"}
                    value={newPhone}
                    func={setNewPhone}
                    placeholder={userInfo.phone || ""}
                  ></Input>
                  <Input
                    label={"이메일"}
                    type={"text"}
                    value={newEmail}
                    func={setNewEmail}
                    placeholder={userInfo.email || ""}
                  ></Input>
                </TextInput>
              </InputArea>
            </InputBox>

            <Button onClick={onEdit}>적용하기</Button>
          </form>
        </div>
      </InnerFrame>
    </Frame>
  );
}
export default PageModify;

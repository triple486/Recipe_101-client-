import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/reducers";
import { useHistory } from "react-router-dom";
import "../../../css/Mypage/MypageMain.css";
import axios from "axios";
import "../../../css/Mypage/Modify.css";
import Input from "../Input";
import styled from "styled-components";
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
  background-image: url(${({ image }) => image});
  background-size: cover;
  border: solid 1px black;
`;
const InputBox = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

function PageModify() {
  let accessToken = useSelector((state: RootState) => state.tokenReducer);
  let user = useSelector((state: RootState) => state.userReducer);
  let userInfo = user.userInfo;
  let usehistory = useHistory();

  const [newImage, setNewImage] = useState<File>();
  const [newUsername, setNewUsername] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [url, seturl] = useState(
    process.env.REACT_APP_SERVER_URL + "/image/default.png"
  );

  const onEdit = () => {
    let data = new FormData();
    if (newImage) {
      data.append("userImage", newImage);
    }
    data.append("userName", newUsername);
    data.append("phone", newPhone);
    data.append("email", newEmail);

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
        .patch(process.env.REACT_APP_SERVER_URL + "/user", data, {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        })
        .then((res) => {
          usehistory.push("/");
        })
        .catch((e) => console.log(e));
    } else {
      alert("error!");
    }
  };
  return (
    <Frame>
      <InnerFrame>
        <div className="Outline">
          <h1 className="text">Modify</h1>
          <form onSubmit={(e) => e.preventDefault()} id="editUserInfo">
            <h2>회원정보 수정</h2>
            <InputBox>
              <ImgLabel image={url} htmlFor={"aaaaa"}>
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
                    label={"username"}
                    type={"text"}
                    value={newUsername}
                    func={setNewUsername}
                    placeholder={userInfo.userName || ""}
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
            </InputBox>

            <button onClick={onEdit}>적용하기</button>
          </form>
        </div>
      </InnerFrame>
    </Frame>
  );
}
export default PageModify;

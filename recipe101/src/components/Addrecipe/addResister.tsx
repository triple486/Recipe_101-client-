import { useDispatch } from "react-redux";
import { storeToken } from "../../redux/tokenReducer";
import styled from "styled-components";
import { useState } from "react";
import Imageupload from "../ImageUpload";
import CancelButton from "../CancelButton";
import { initial } from "../../redux/addrecipeReducer";
import Input from "../Input";
import axios from "axios";

const Modal = styled.div`
  height: 100vh;
  width: 100vw;
  z-index: 2;
  top: 0;
  left: 0;
  position: fixed;
  display: flex;
  color: black;
  justify-content: center;
  align-items: center;
`;

const Frame = styled.div`
  height: 380px;
  width: 760px;
  display: flex;
  border: solid 1px red;
  flex-direction: column;
  background: white;
`;
const InnerFrame = styled.div`
  height: 360px;
  width: 760px;
  display: flex;
  flex-direction: row;
`;

const InputFrame = styled.div`
  flex: 1 0 0;
  display: flex;
  flex-direction: column;
`;
const ImageFrame = styled.div`
  height: 360px;
  width: 360px;
`;

const Line = styled.div<{ err?: boolean }>`
  flex: 1 0 0;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.err ? "red" : "white")};
`;

const Button = styled.button`
  flex: 1 0 0;
  height: 100%;
`;

interface imgdata {
  file?: File;
  imgpath?: string | ArrayBuffer | null;
  isin?: boolean;
}

interface useinfo {
  username: string;
  password: string;
  email: string;
  phone: string;
  userImage: imgdata;
}

const IMG = styled.img`
  height: inherit;
  width: inherit;
`;

const IMGBox = styled.div`
  height: 360px;
  width: 360px;
  display: flex;
  flex-direction: column;
`;

const Imagecancel = styled.button`
  height: 20px;
  width: 100%;
`;

export default function Resister({
  data,
  func,
}: {
  data: FormData | undefined;
  func: Function;
}) {
  const dispatch = useDispatch();

  const [validcheck, validcheckf] = useState({
    username: false,
    password: false,
    email: false,
    phone: false,
  });
  const [userinfo, setuserinfo] = useState<useinfo>({
    username: "",
    email: "",
    phone: "",
    password: "",
    userImage: { isin: false },
  });
  function validation(type: string) {
    const email = new RegExp(
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
    );
    const username = new RegExp(/^[A-za-z0-9]{5,15}/g);
    const password = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);
    const phone = new RegExp(/^\d{2,3}-\d{3,4}-\d{4}$/);
    return function (value: string) {
      let ans = true,
        ndata = { ...validcheck };
      switch (type) {
        case "email":
          ans = value.length ? !email.test(value) : false;
          ndata["email"] = ans;
          validcheckf({ ...ndata });
          if (!ans) {
            setuserinfo({ ...userinfo, email: value });
          }
          return ans;

        case "password":
          ans = value.length ? !password.test(value) : false;
          ndata["password"] = ans;
          validcheckf({ ...ndata });
          if (!ans) {
            setuserinfo({ ...userinfo, password: value });
          }

          return ans;

        case "phone":
          ans = value.length ? !phone.test(value) : false;
          ndata["phone"] = ans;
          validcheckf({ ...ndata });
          if (!ans) {
            setuserinfo({ ...userinfo, phone: value });
          }

          return ans;

        default:
          ans = value.length ? !username.test(value) : false;
          ndata["username"] = ans;
          validcheckf({ ...ndata });
          if (!ans) {
            setuserinfo({ ...userinfo, username: value });
          }

          return ans;
      }
    };
  }

  return (
    <Modal>
      <Frame>
        <CancelButton
          Cancel={() => {
            func(false);
          }}
        ></CancelButton>
        <InnerFrame>
          <ImageFrame>
            {userinfo.userImage.isin ? (
              <IMGBox>
                <IMG
                  src={
                    typeof userinfo.userImage.imgpath === "string"
                      ? userinfo.userImage.imgpath
                      : ""
                  }
                ></IMG>
                <Imagecancel
                  onClick={() => {
                    setuserinfo({
                      ...userinfo,
                      userImage: {
                        isin: false,
                      },
                    });
                  }}
                >
                  {"취소"}
                </Imagecancel>
              </IMGBox>
            ) : (
              <Imageupload
                func={(files: any) => {
                  setuserinfo({
                    ...userinfo,
                    userImage: {
                      file: files[0],
                      imgpath: URL.createObjectURL(files[0]),
                      isin: true,
                    },
                  });
                }}
                name={"resister2"}
              />
            )}
          </ImageFrame>
          <InputFrame>
            <Line err={validcheck["username"]}>
              <Input label={"username"} bfunc={validation("username")}></Input>
            </Line>
            <Line err={validcheck["password"]}>
              <Input label={"password"} bfunc={validation("password")}></Input>
            </Line>
            <Line err={validcheck["email"]}>
              <Input label={"email"} bfunc={validation("email")}></Input>
            </Line>
            <Line err={validcheck["phone"]}>
              <Input label={"phone"} bfunc={validation("phone")}></Input>
            </Line>
            <Line></Line>
            <Line>
              <Button
                onClick={() => {
                  let rdata = new FormData();
                  if (userinfo.userImage.file) {
                    rdata.append("userImage", userinfo.userImage.file);
                  }
                  rdata.append("username", userinfo.username);
                  rdata.append("password", userinfo.password);
                  rdata.append("email", userinfo.email);
                  rdata.append("phone", userinfo.phone);
                  const config = {
                    headers: {
                      "content-type": "multipart/form-data",
                    },
                  };
                  axios
                    .post(
                      process.env.REACT_APP_SERVER_URL + "/signup",
                      rdata,
                      config
                    )
                    .then((res) => {
                      dispatch(storeToken(res.data.data.accessToken));

                      console.log(res);
                      const config = {
                        headers: {
                          "content-type": "multipart/form-data",
                          authorization: "bearer " + res.data.data.accessToken,
                        },
                      };
                      return axios.post(
                        process.env.REACT_APP_SERVER_URL + "/recipe",
                        data,
                        config
                      );
                    })
                    .then((rst) => {
                      dispatch(initial());
                      func(false);
                    })
                    .catch((err) => {
                      console.log("fail");
                    });
                }}
              >
                회원 가입
              </Button>
            </Line>
          </InputFrame>
        </InnerFrame>
      </Frame>
    </Modal>
  );
}

import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import { isOn } from "../../redux/modalReducer";
import CancelButton from "../CancelButton";
import { useDispatch } from "react-redux";
import Input from "../Input";
import axios from "axios";
import Imageupload from "../ImageUpload";
import { storeToken } from "../../redux/tokenReducer";
import { updateLogin, updateUserInfo } from "../../redux/userReducer";

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

const IMG = styled.img`
  height: 340px;
  width: 360px;
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
export default function Resister() {
  let location = useLocation();
  let path = location.pathname.slice(0, -9);
  const [userinfo, setuserinfo] = useState<useinfo>({
    username: "",
    email: "",
    phone: "",
    password: "",
    userImage: { isin: false },
  });
  const [validcheck, validcheckf] = useState({
    username: false,
    password: false,
    email: false,
    phone: false,
  });
  let [err, seterr] = useState("");

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
  let history = useHistory();
  let dispatch = useDispatch();

  return (
    <Frame>
      <CancelButton
        Cancel={() => {
          dispatch(isOn(false));
          history.push(path.length ? path : "/");
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
            <Input
              label={"password"}
              type={"password"}
              bfunc={validation("password")}
            ></Input>
          </Line>
          <Line err={validcheck["email"]}>
            <Input
              label={"email"}
              type={"email"}
              bfunc={validation("email")}
            ></Input>
          </Line>
          <Line err={validcheck["phone"]}>
            <Input
              label={"phone"}
              type={"phone"}
              bfunc={validation("phone")}
            ></Input>
          </Line>
          <Line>{err.length ? err : null}</Line>
          <Line>
            <Button
              onClick={() => {
                history.push(path.length ? path + "/login" : "/login");
              }}
            >
              로그인 창으로
            </Button>
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

                    const config = {
                      headers: {
                        authorization: "bearer " + res.data.data.accessToken,
                      },
                    };
                    return axios.get(
                      process.env.REACT_APP_SERVER_URL + "/user",
                      config
                    );
                  })
                  .then((res) => {
                    dispatch(updateLogin(true));
                    dispatch(updateUserInfo(res.data.data.userinfo));
                    dispatch(isOn(false));
                    history.push(path.length ? path : "/");
                  })
                  .catch((err) => {
                    seterr(err.response.data ? err.response.data.message : "");
                  });
              }}
            >
              회원 가입
            </Button>
          </Line>
        </InputFrame>
      </InnerFrame>
    </Frame>
  );
}

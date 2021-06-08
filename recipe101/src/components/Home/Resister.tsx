import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import { isOn } from "../../redux/modalReducer";
import CancelButton from "../CancelButton";
import { useDispatch } from "react-redux";
import axios from "axios";
import Imageupload from "../ImageUpload";
import { storeToken } from "../../redux/tokenReducer";
import { updateLogin, updateUserInfo } from "../../redux/userReducer";
import logo from "../../icon/logo2.png";

axios.defaults.withCredentials = true;

const Frame = styled.div`
  position: realtive;
  height: 540px;
  width: 760px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: white;
  border-radius: 5px;
`;

const InnerFrame = styled.div`
  height: 520px;
  width: 760px;
  display: flex;
  justify-content: center;
  align-items: center;
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
const Element = styled.div`
  padding: 8px 20px;
`;

const Label = styled.div`
  display: block;
  font-size: 14px;
  color: #222;
  margin-bottom: 5px;
`;
const Input = styled.input<{ err: boolean }>`
  width: 100%;
  padding: 8px 10px;
  box-sizing: border-box;
  outline: none;
  border-radius: 5px;
  border: 1px solid ${({ err }) => (err ? "red" : "#aaa")};
`;

const Header = styled.div`
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  color: #222;
  margin: 20px 0px;
`;

const Avatar = styled.img`
  margin: 5px;
  text-align: center;
  width: 200px;
`;

const Button = styled.button`
  flex: 1 0 0;
  height: 100%;
  margin-top: 5px;
  width: 100%;
  padding: 10px 0px;
  text-transform: uppercase;
  font-size: 15px;
  font-weight: 600;
  border-radius: 5px;
  cursor: pointer;
  background: #b17d55;
  color: #f5f5f5;
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

interface userInfo {
  username: string;
  password: string;
  email: string;
  phone: string;
  userImage: imgdata;
}

export default function Resister() {
  let location = useLocation();
  let path = location.pathname.slice(0, -9);

  let [err, seterr] = useState("");

  const [validcheck, validcheckf] = useState({
    username: false,
    password: false,
    email: false,
    phone: false,
  });
  const [userinfo, setuserinfo] = useState<userInfo>({
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

  let history = useHistory();
  let dispatch = useDispatch();

  function ToRegister() {
    let formdata = new FormData();
    if (userinfo.userImage.file) {
      formdata.append("userImage", userinfo.userImage.file);
    }
    formdata.append("username", userinfo.username);
    formdata.append("password", userinfo.password);
    formdata.append("email", userinfo.email);
    formdata.append("phone", userinfo.phone);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios
      .post(process.env.REACT_APP_SERVER_URL + "/signup", formdata, config)
      .then((res) => {
        dispatch(storeToken(res.data.data.accessToken));

        const config = {
          headers: {
            authorization: "bearer " + res.data.data.accessToken,
          },
        };
        return axios.get(process.env.REACT_APP_SERVER_URL + "/user", config);
      })
      .then((res) => {
        dispatch(updateLogin(true));
        dispatch(updateUserInfo(res.data.data.userinfo));
        dispatch(isOn(false));
        history.push(path.length ? path : "/");
      })
      .catch((err) => {
        seterr(
          err.response && err.response.data ? err.response.data.message : ""
        );
      });
  }
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
          <Line>
            <Avatar src={logo} />
          </Line>
          <Header>Create Account</Header>
          <Element>
            <Label>Username</Label>
            <Input
              type="text"
              id="username"
              err={validcheck.username}
              onFocus={(e) => {
                validcheckf({ ...validcheck, username: false });
              }}
              onBlur={(event: any) =>
                validation("username")(event.target.value)
              }
              required
            />
            {/* {validcheck.username && (
              <small className="error">
                {"형식에 맞지 않는 아이디입니다."}
              </small>
            )} */}
          </Element>
          <Element>
            <Label>Password</Label>
            <Input
              type="password"
              id="password"
              err={validcheck.password}
              onFocus={(e) => {
                validcheckf({ ...validcheck, password: false });
              }}
              onBlur={(event: any) =>
                validation("password")(event.target.value)
              }
              required
            />
            {/* {validcheck.password && (
              <small className="error">
                {"형식에 맞지 않는 비밀번호 입니다."}
              </small>
            )} */}
          </Element>
          <Element>
            <Label>Email</Label>
            <Input
              type="email"
              id="email"
              err={validcheck.email}
              onFocus={(e) => {
                validcheckf({ ...validcheck, email: false });
              }}
              onBlur={(event: any) => validation("email")(event.target.value)}
              required
            />
            {/* {validcheck.email && (
              <small className="error">
                {"형식에 맞지 않는 이메일입니다."}
              </small>
            )} */}
          </Element>
          <Element>
            <Label>Phone</Label>
            <Input
              type="tel"
              id="phone"
              err={validcheck.phone}
              onFocus={(e) => {
                validcheckf({ ...validcheck, phone: false });
              }}
              onBlur={(event: any) => validation("phone")(event.target.value)}
              required
            />
            {/* {validcheck.phone && (
              <small className="error">
                {"형식에 맞지 않는 전화번호입니다."}
              </small>
            )} */}
          </Element>
          <Element>
            <Line>{err && err.length ? err : null}</Line>
            <Line>
              <Button
                onClick={() => {
                  history.push(path.length ? path + "/login" : "/login");
                }}
              >
                로그인 창으로
              </Button>
              <Button onClick={() => ToRegister()}>회원 가입</Button>
            </Line>
          </Element>
        </InputFrame>
      </InnerFrame>
    </Frame>
  );
}

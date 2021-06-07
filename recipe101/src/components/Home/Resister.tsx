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
  height: 520px;
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
const Input = styled.input`
  width: 100%;
  padding: 8px 10px;
  box-sizing: border-box;
  outline: none;
  border: 1px solid #aaa;
  background: #eee;
  border-radius: 5px;
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

interface useInfo {
  username: string;
  password: string;
  email: string;
  phone: string;
  userImage: imgdata;
}

interface errors {
  username: string;
  password: string;
  email: string;
  phone: string;
}
export default function Resister() {
  let location = useLocation();
  let path = location.pathname.slice(0, -9);
  const [userInfo, setUserInfo] = useState<useInfo>({
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

  const [errors, setErrors] = useState<errors>({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  function validation(type: string) {
    if (!userInfo.username) {
      errors.username = "Name is required.";
    }
    if (!userInfo.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(userInfo.email)) {
      errors.email = "Email is invalid";
    }
    if (!userInfo.password) {
      errors.password = "Password is required";
    } else if (userInfo.password.length < 5) {
      errors.password = "Password must be more than five characters.";
    }

    return errors;
  }

  let history = useHistory();
  let dispatch = useDispatch();

  function ToRegister() {
    let formdata = new FormData();
    if (userInfo.userImage.file) {
      formdata.append("userImage", userInfo.userImage.file);
    }
    formdata.append("username", userInfo.username);
    formdata.append("password", userInfo.password);
    formdata.append("email", userInfo.email);
    formdata.append("phone", userInfo.phone);
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
          {userInfo.userImage.isin ? (
            <IMGBox>
              <IMG
                src={
                  typeof userInfo.userImage.imgpath === "string"
                    ? userInfo.userImage.imgpath
                    : ""
                }
              ></IMG>
              <Imagecancel
                onClick={() => {
                  setUserInfo({
                    ...userInfo,
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
                setUserInfo({
                  ...userInfo,
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
              value={userInfo.username}
              onChange={(event: any) =>
                setUserInfo({ ...userInfo, username: event.target.value })
              }
            />
            {errors.username && <p className="error">{errors.username}</p>}
          </Element>
          <Element>
            <Label>Password</Label>
            <Input
              type="password"
              id="password"
              value={userInfo.password}
              onChange={(event: any) =>
                setUserInfo({ ...userInfo, password: event.target.value })
              }
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </Element>
          <Element>
            <Label>Email</Label>
            <Input
              type="email"
              id="email"
              value={userInfo.email}
              onChange={(event: any) =>
                setUserInfo({ ...userInfo, email: event.target.value })
              }
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </Element>
          <Element>
            <Label>Phone</Label>
            <Input
              type="tel"
              id="phone"
              value={userInfo.phone}
              onChange={(event: any) =>
                setUserInfo({ ...userInfo, phone: event.target.value })
              }
            />
            {errors.phone && <p className="error">{errors.phone}</p>}
          </Element>
          <Element>
            <Line>{err && err.length ? err : null}</Line>
            <Line>
              <Button
                onClick={() => {
                  history.push(path.length ? path + "/login" : "/login");
                }}
              >
                To Login
              </Button>
              <Button onClick={() => ToRegister()}>Submit</Button>
            </Line>
          </Element>
        </InputFrame>
      </InnerFrame>
    </Frame>
  );
}

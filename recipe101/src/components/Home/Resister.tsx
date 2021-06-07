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
  height: 600px;
  width: 760px;
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 5px;
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

  // const handleChange = (event: any) => {
  //   setUserInfo({
  //     ...userInfo,
  //     [event.target.id]: event.target.value,
  //   });
  // };

  // function validation(type: string) {
  //   const email = new RegExp(
  //     /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
  //   );
  //   const username = new RegExp(/^[A-za-z0-9]{5,15}/g);
  //   const password = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);
  //   const phone = new RegExp(/^\d{2,3}-\d{3,4}-\d{4}$/);
  //   return function (value: string) {
  //     let ans = true,
  //       ndata = { ...validcheck };
  //     switch (type) {
  //       case "email":
  //         ans = value.length ? !email.test(value) : false;
  //         ndata["email"] = ans;
  //         validcheckf({ ...ndata });
  //         if (!ans) {
  //           setUserInfo({ ...userInfo, email: value });
  //         }
  //         return ans;

  //       case "password":
  //         ans = value.length ? !password.test(value) : false;
  //         ndata["password"] = ans;
  //         validcheckf({ ...ndata });
  //         if (!ans) {
  //           setUserInfo({ ...userInfo, password: value });
  //         }

  //         return ans;

  //       case "phone":
  //         ans = value.length ? !phone.test(value) : false;
  //         ndata["phone"] = ans;
  //         validcheckf({ ...ndata });
  //         if (!ans) {
  //           setUserInfo({ ...userInfo, phone: value });
  //         }

  //         return ans;

  //       default:
  //         ans = value.length ? !username.test(value) : false;
  //         ndata["username"] = ans;
  //         validcheckf({ ...ndata });
  //         if (!ans) {
  //           setUserInfo({ ...userInfo, username: value });
  //         }

  //         return ans;
  //     }
  //   };
  // }

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

  // const checkInputs = () => {
  //   const usernameValue = userInfo.username.trim();
  //   const passworValue = userInfo.password.trim();
  //   const emailValue = userInfo.email.trim();
  //   const phoeValue = userInfo.phone.trim();

  //   if (usernameValue === "") {
  //     ///show error
  //     /// add error class
  //     setErrorFor(username, "Username cannot be blank");
  //   } else {
  //     // add success class
  //     setSuccessFor(username);
  //   }
  // };

  // function valdateInfo(type: string) {
  //   let [errMesUsername, setErrMesUsername] = useState("");
  //   let [errMesPassword, setErrMesPassword] = useState("");
  //   let [errMesEmail, setErrMesEmail] = useState("");
  //   let [errMesPhone, setErrMesPhone] = useState("");

  //   if (!userInfo.username.trim()) {
  //     setErrMesUsername("Username is required")
  //   } else (!/^[A-za-z0-9]{5,15}/g.test(userInfo.username)) {
  //     setErrMesUsername("Username should be more than 5")
  //   }

  //   if (!userInfo.password.trim()) {
  //     setErrMesPassword("Password is required")
  //   } else (userInfo.password.length <5) {
  //     setErrMesPassword("Password should contain more than 5")
  //   }

  //   if (!userInfo.email.trim()) {
  //     setErrMesEmail("Email is required")
  //   } else if (!/\S+@\S+\.\S+/.test(values.email)) {
  //     errors.email = "Eamil address is invalid";
  //   }

  //   if (!values.password) {
  //     errors.password = "Password is required";
  //   } else if (values.password.length < 6) {
  //     errors.password = "Password needs to be 6 characters or more";
  //   }

  //   if (!values.password2) {
  //     errors.password2 = "Password is required";
  //   } else if (values.password2 !== values.password) {
  //     errors.password2 = "Passwords do not match";
  //   }

  //   return errors;
  // }

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

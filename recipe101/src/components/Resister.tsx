import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import Modal from "./Modal";
import CancelButton from "./CancelButton";
import Input from "./Input";
const Frame = styled.div`
  height: 40%;
  width: 40%;
  display: flex;
  border: solid 1px red;
  flex-direction: column;
  background: white;
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

export default function Resister() {
  const [name, namef] = useState("");
  const [password, passwordf] = useState("");
  const [email, emailf] = useState("");
  const [phone, phonef] = useState("");
  const [validcheck, validcheckf] = useState({
    username: false,
    password: false,
    email: false,
    phone: false,
  });

  function validation(type: string) {
    const email = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    const username = new RegExp(/^[A-za-z0-9]{5,15}/g);
    const password = new RegExp(/^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$/);
    const phone = new RegExp(/^\d{2,3}-\d{3,4}-\d{4}$/);
    return function (value: string) {
      let ans = true,
        ndata = { ...validcheck };
      switch (type) {
        case "email":
          ans = value.length ? !email.test(value) : false;
          console.log(ans, value);
          ndata["email"] = ans;
          validcheckf({ ...ndata });
          return ans;

        case "password":
          ans = value.length ? !password.test(value) : false;
          console.log(ans, value);
          ndata["password"] = ans;
          validcheckf({ ...ndata });
          return ans;

        case "phone":
          ans = value.length ? !phone.test(value) : false;
          console.log(ans, value);
          ndata["phone"] = ans;
          validcheckf({ ...ndata });
          return ans;

        default:
          ans = value.length ? !username.test(value) : false;
          console.log(ans, value);
          ndata["username"] = ans;
          validcheckf({ ...ndata });
          return ans;
      }
      return;
    };
  }

  function errprint() {}

  let history = useHistory();
  return (
    <Modal>
      <Frame>
        <CancelButton to={"/"}></CancelButton>
        <Line err={validcheck["username"]}>
          <Input
            label={"username"}
            type={"text"}
            value={name}
            func={namef}
            bfunc={validation("username")}
          ></Input>
        </Line>
        <Line err={validcheck["password"]}>
          <Input
            label={"password"}
            type={"password"}
            value={password}
            func={passwordf}
            bfunc={validation("password")}
          ></Input>
        </Line>
        <Line err={validcheck["email"]}>
          <Input
            label={"email"}
            type={"email"}
            value={email}
            func={emailf}
            bfunc={validation("email")}
          ></Input>
        </Line>
        <Line err={validcheck["phone"]}>
          <Input
            label={"phone"}
            type={"text"}
            value={phone}
            func={phonef}
            bfunc={validation("phone")}
          ></Input>
        </Line>
        <Line></Line>
        <Line>
          <Button
            onClick={() => {
              history.push("/login");
            }}
          >
            로그인 창으로
          </Button>
          <Button onClick={() => {}}>회원 가입</Button>
        </Line>
      </Frame>
    </Modal>
  );
}

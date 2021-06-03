import styled from "styled-components";
import { RootState } from "../../../redux/reducers";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
axios.defaults.withCredentials = true;
const Frame = styled.div`
  height: ${window.innerHeight - 100}px;
  flex: 1 0 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const InnerFrame = styled.div`
  height: 100%;
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const PasswordBoard = styled.div`
  height: 60%;
  width: 20%;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  border: solid 3px white;
`;
const Line = styled.div<{ c?: boolean }>`
  flex: 1 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ c }) => (c ? `background-color: red;` : "")}
`;
const PasswordInput = styled.input`
  width: 80%;
  height: 60%;
  display: flex;
`;
const Button = styled.button`
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

const TextBox = styled.div`
  display: flex;
`;

const TitleBox = styled.div`
  display: flex;
  font-size: 24px;
  font-weight: 700;
`;
interface check {
  now: boolean;
  new: boolean;
  check: boolean;
}
interface pwd {
  now: string;
  new: string;
}

export default function Profile() {
  let accessToken = useSelector((state: RootState) => state.tokenReducer);
  const password = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);
  let [c, setc] = useState<check>({ now: false, new: false, check: false });
  let [s, sets] = useState<pwd>({ now: "", new: "" });
  const config = {
    headers: {
      authorization: "bearer " + accessToken,
    },
  };
  function check(type: string) {
    return (value: string) => {
      if (type === "A") {
        axios
          .post(
            process.env.REACT_APP_SERVER_URL + `/password`,
            { password: value },
            config
          )
          .then((rst) => {
            sets({ ...s, now: value });
            setc({ ...c, now: false });
          })
          .catch(() => {
            setc({ ...c, now: true });
          });
      } else if ((type = "B")) {
        if (password.test(value)) {
          sets({ ...s, new: value });
          setc({ ...c, new: false });
        } else {
          setc({ ...c, new: true });
        }
      } else {
        if (value !== s.new) {
          setc({ ...c, check: true });
        } else {
          setc({ ...c, check: false });
        }
      }
    };
  }
  let history = useHistory();
  return (
    <Frame>
      <InnerFrame>
        <PasswordBoard>
          <Line>
            <TitleBox>{"비밀번호 변경"}</TitleBox>
          </Line>
          <Line c={c.now}>
            <PasswordInput
              type={"password"}
              placeholder={"현재 비밀번호"}
              onBlur={(e) => {
                check("A")(e.target.value);
              }}
            ></PasswordInput>
          </Line>
          <Line c={c.new}>
            <PasswordInput
              type={"password"}
              placeholder={"새 비밀번호"}
              onBlur={(e) => {
                check("B")(e.target.value);
              }}
            ></PasswordInput>
          </Line>
          <Line c={c.check}>
            <PasswordInput
              type={"password"}
              placeholder={"새 비밀번호 확인"}
              onBlur={(e) => {
                check("C")(e.target.value);
              }}
            ></PasswordInput>
          </Line>
          <Line>
            <Button
              onClick={() => {
                axios
                  .patch(
                    process.env.REACT_APP_SERVER_URL + `/password`,
                    { password: s.new },
                    config
                  )
                  .then(() => {
                    history.goBack();
                    console.log("변경 완료");
                  })
                  .catch();
              }}
            >
              <TextBox>{"변경하기"}</TextBox>
            </Button>
          </Line>
        </PasswordBoard>
      </InnerFrame>
    </Frame>
  );
}

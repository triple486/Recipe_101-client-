import styled from "styled-components";
import { ContextProfile, ContextPassword, ContextDefault } from "./Context";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { init } from "../../redux/userReducer";
import axios from "axios";
const InnerFrame = styled.div`
  min-height: ${window.innerHeight - 100}px;
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;
const OuterFrame = styled.div`
  height: ${window.innerWidth < 1200 ? window.innerWidth * 0.33 : 400}px;
  width: ${window.innerWidth < 1200 ? window.innerWidth * 0.5 : 600}px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentBox = styled.div`
  height: 60%;
  width: 70%;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  // align-items: center;
  border: solid 1px black;
`;
const UpperLine = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Button = styled.button`
  display: flex;
  margin-right: 10px;
  justify-content: center;
  align-items: center;
`;
const TextBox = styled.div`
  display: flex;
`;

const ContentNameBox = styled.div`
  display: flex;
  padding: 10px;
  font-size: 20px;
  font-weight: 700;
`;

export default function Main() {
  let names = [
    "프로필",
    "비밀번호",
    "담아온 레시피",
    "작성한 레시피",
    "작성한 감상평들",
    "구독한 유저들",
  ];

  let dispatch = useDispatch();
  let history = useHistory();
  return (
    <InnerFrame>
      {names.map((x, i) => {
        return (
          <OuterFrame key={i}>
            <ContentBox>
              <UpperLine>
                <ContentNameBox>{x}</ContentNameBox>
                {x === "프로필" ? (
                  <Button
                    onClick={() => {
                      axios
                        .get(process.env.REACT_APP_SERVER_URL + `/signout`)
                        .then((rst) => {
                          dispatch(init());
                          history.push("/");
                        });
                    }}
                  >
                    <TextBox>{"로그아웃"}</TextBox>
                  </Button>
                ) : null}
              </UpperLine>
              {x === "프로필" ? <ContextProfile /> : null}
              {x === "비밀번호" ? <ContextPassword /> : null}
              {x !== "프로필" && x !== "비밀번호" ? (
                <ContextDefault type={x} />
              ) : null}
            </ContentBox>
          </OuterFrame>
        );
      })}
    </InnerFrame>
  );
}

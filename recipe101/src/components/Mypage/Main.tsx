import styled from "styled-components";
import { ContextProfile, ContextPassword, ContextDefault } from "./Context";
import { useHistory } from "react-router-dom";
import { RootState } from "../../redux/reducers";
import { useSelector, useDispatch } from "react-redux";
import { init } from "../../redux/userReducer";
import axios from "axios";
axios.defaults.withCredentials = true;
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
  border: solid 1px white;
`;
const UpperLine = styled.div`
  background-color: #ebd1a9;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  }
`;
const TextBox = styled.div`
  display: flex;
`;

const ContentNameBox = styled.div`
  display: flex;
  padding: 20px;
  font-size: 20px;
  font-weight: 700;
  background-color: #ebd1a9;
  color: black;
`;

export default function Main({ func }: { func: Function }) {
  let names = [
    "프로필",
    "비밀번호",
    "담아온 레시피",
    "작성한 레시피",
    "작성한 감상평들",
    "구독한 유저들",
  ];
  let accessToken = useSelector((state: RootState) => state.tokenReducer);
  let user = useSelector((state: RootState) => state.userReducer);
  let dispatch = useDispatch();
  let history = useHistory();
  return (
    <InnerFrame>
      {names.map((x, i) => {
        return user.isKakao && x === "비밀번호" ? null : (
          <OuterFrame key={i}>
            <ContentBox>
              <UpperLine>
                <ContentNameBox>{x}</ContentNameBox>
                {x === "프로필" ? (
                  <Button
                    onClick={() => {
                      const config = {
                        headers: {
                          authorization: "bearer " + accessToken,
                        },
                      };
                      axios
                        .get(
                          process.env.REACT_APP_SERVER_URL + `/signout`,
                          config
                        )
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
              {x === "비밀번호" ? <ContextPassword func={func} /> : null}
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

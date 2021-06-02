import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { isOn } from "../../redux/modalReducer";
import { RootState } from "../../redux/reducers";
import SearchInput from "./SearchInput";
import LOGO from "../../icon/logo.png";
// import "../../css/index.css";
const Frame = styled.div`
  flex: 1 0 1;
  height: 100px;
  width: 100%;
  display: flex;
  justify-content: center;
  border-bottom: solid 1px black;
`;

const Body = styled.div`
  height: 100%;
  max-width: 1200px;
  width: 100%;
  display: flex;

  flex-direction: row;
`;

const Box = styled.div`
  height: 100%;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 1;
`;

const Box2 = styled.div`
  height: 100%;
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 1;
`;

const Logo = styled.img`
  width: 250px;
  display: block;
  flex: 0 0 1;
`;

const TextBox = styled.div``;

const LongBox = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1 0 0;
`;

function Comp() {
  let history = useHistory();
  let location = useLocation();

  let dispatch = useDispatch();
  let user = useSelector((state: RootState) => state.userReducer);
  return (
    <Frame>
      <Body>
        <Box2>
          <Logo
            onClick={() => {
              history.push("/");
            }}
            src={LOGO}
          ></Logo>
        </Box2>
        <LongBox>
          <SearchInput></SearchInput>
        </LongBox>
        <Box
          onClick={() => {
            history.push("/addrecipe");
          }}
        >
          <TextBox>{"레시피 추가"}</TextBox>
        </Box>
        <Box
          onClick={() => {
            if (user.isLogin) {
              history.push("/mypage");
            } else {
              dispatch(isOn(true));
              history.push(
                location.pathname === "/"
                  ? "/login"
                  : location.pathname + "/login"
              );
            }
          }}
        >
          {user.isLogin ? (
            <TextBox>{"마이페이지"}</TextBox>
          ) : (
            <TextBox>{"로그인"}</TextBox>
          )}
        </Box>
      </Body>
    </Frame>
  );
}

export default Comp;

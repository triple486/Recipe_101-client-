import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { isOn } from "../../redux/modalReducer";
import { RootState } from "../../redux/reducers";
import SearchInput from "./SearchInput";
import LOGO from "../../icon/logo.png";
// import "../../css/index.css";
const Frame = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: center;
  background: #B17D55;
  border-bottom: 1px solid white;
  color: white;
`;

const Body = styled.div`
  height: 100%;
  max-width: 1200px;
  width: 100%;
  display: flex;

  flex-direction: row;
`;

const Box1 = styled.div`
  height: 100%;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 2 0 0;
`;

const Box2 = styled.div`
  height: 100%;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 0 0;
`;

const TextBox = styled.div`
  &:hover {
    cursor: pointer;
  }
  font-weight: 700;
`;
////////////////////////////////////////////// resolve conflict
// const Box2 = styled.div`
//   height: 100%;
//   width: 200px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex: 0 0 1;
// `;

const Logo = styled.img`
  width: 160px;
  display: block;
  flex: 0 0 1;
  &:hover {
    cursor: pointer;
  }
  margin-left: 8px;
`;

// const TextBox = styled.div``;
//////////////////////////////////////////////
const LongBox = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 6 0 0;
`;

function Comp() {
  let history = useHistory();
  let location = useLocation();

  let dispatch = useDispatch();
  let user = useSelector((state: RootState) => state.userReducer);
  return (
    <Frame>
      <Body>
        {/* <Box1
          onClick={() => {
            history.push("/");
          }}
        >
          <TextBox>{"recipe 101"}</TextBox>
        </Box1> */}
        <Box1>
          <Logo
            onClick={() => {
              history.push("/");
            }}
            src={LOGO}
          ></Logo>
        </Box1>
        <LongBox>
          <SearchInput></SearchInput>
        </LongBox>
        <Box2
          onClick={() => {
            history.push("/addrecipe");
          }}
        >
          <TextBox>{"레시피 추가"}</TextBox>
        </Box2>
        <Box2
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
        </Box2>
      </Body>
    </Frame>
  );
}

export default Comp;

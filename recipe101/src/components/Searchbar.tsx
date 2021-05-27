import {
  Route,
  Switch,
  useHistory,
  useLocation,
  Link,
  Redirect,
} from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../redux/reducers";

const Frame = styled.div`
  height: 100px;
  width: 100%;
  display: flex;
  justify-content: center;
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
  flex: 0 0 1;
`;

const LongBox = styled.div`
  height: 100%;
  display: flex;

  flex: 1 0 0;
`;

function Comp({ search }: { search: any }) {
  let history = useHistory();
  let location = useLocation();
  let user = useSelector((state: RootState) => state.userReducer);
  return (
    <Frame>
      <Body>
        <Box>로고</Box>
        <LongBox></LongBox>
        <Box> 레시피 추가</Box>
        <Box
          onClick={() => {
            if (user.isLogin) {
              history.push("/mypage");
            } else {
              history.push("/login");
            }
          }}
        >
          {user.isLogin ? "마이페이지" : "로그인"}
        </Box>
      </Body>
    </Frame>
  );
}

export default Comp;

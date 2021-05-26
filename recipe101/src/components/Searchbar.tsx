import {
  Route,
  Switch,
  useHistory,
  useLocation,
  Link,
  Redirect,
} from "react-router-dom";
import styled from "styled-components";

const Frame = styled.div`
  height:100px;
  width: 100%
  display: flex

`;

function Comp({ search }: { search: any }) {
  let history = useHistory();
  let location = useLocation();
  return (
    <Frame>
      <button
        onClick={() => {
          history.push("/addrecipe");
        }}
      >
        addrecipe
      </button>
      <button
        onClick={() => {
          history.push("/mypage");
        }}
      >
        mypage
      </button>
      <button
        onClick={() => {
          search[1](!search[0]);
        }}
      >
        search
      </button>
      <button
        onClick={() => {
          history.push("/login");
        }}
      >
        로그인
      </button>
      <button
        onClick={() => {
          history.push("/");
        }}
      >
        back
      </button>
    </Frame>
  );
}

export default Comp;

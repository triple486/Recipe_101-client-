import { Route, Switch, useHistory, useLocation, Link } from "react-router-dom";
import styled from "styled-components";
const Frame = styled.div`
  height: 40%;
  width: 40%;
  display: flex;
  border: solid 1px red;
`;

function Login({ login }: { login: any }) {
  let history = useHistory();
  return (
    <Frame>
      <button
        onClick={() => {
          login[1](false);
          history.push("/");
        }}
      >
        back
      </button>
    </Frame>
  );
}

export default Login;

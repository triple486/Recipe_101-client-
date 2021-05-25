import { Route, Switch, useHistory, useLocation, Link } from "react-router-dom";

function Login() {
  let history = useHistory();
  return (
    <div>
      <button
        onClick={() => {
          history.push("/");
        }}
      ></button>
    </div>
  );
}

export default Login;

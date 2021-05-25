import { useHistory, useLocation, Link, Redirect } from "react-router-dom";

function Comp({ search }: { search: any }) {
  let history = useHistory();
  let location = useLocation();
  return (
    <div>
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
    </div>
  );
}

export default Comp;

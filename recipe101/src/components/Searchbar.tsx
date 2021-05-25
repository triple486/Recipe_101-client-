import { useHistory, useLocation, Link, Redirect } from "react-router-dom";

function Comp({ Search, login }: { Search: any; login: any }) {
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
          Search[1](!Search[0]);
        }}
      >
        search
      </button>
      <button
        onClick={() => {
          login[1](!login[0]);
        }}
      >
        로그인
      </button>
      <button
        onClick={() => {
          Search[1](false);
          history.push("/");
        }}
      >
        back
      </button>
    </div>
  );
}

export default Comp;

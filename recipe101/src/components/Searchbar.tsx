import { useHistory, useLocation, Link, Redirect } from "react-router-dom";

function Comp({
  isSearch,
  isSearchf,
}: {
  isSearch: boolean;
  isSearchf: Function;
}) {
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
          isSearchf(!isSearch);
        }}
      >
        search
      </button>
      <Link to={{ pathname: "/login", state: { background: location } }}>
        로그인
      </Link>
      <button
        onClick={() => {
          isSearchf(false);
          history.push("/");
        }}
      >
        back
      </button>
    </div>
  );
}

export default Comp;

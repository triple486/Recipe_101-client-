import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/reducers";
import { init } from "../../redux/userReducer";
import axios from "axios";
import { updateSourceFile } from "typescript";
function Mypage() {
  let dispatch = useDispatch();
  let Accesstoken = useSelector((state: RootState) => state.tokenReducer);
  let user = useSelector((state: RootState) => state.userReducer);

  return (
    <div>
      <div>{"Access token :" + Accesstoken}</div>
      <div>{"is login :" + `${user.isLogin}`}</div>
      <div>{"user info :" + `${user.userInfo}`}</div>
      <button
        onClick={() => {
          axios
            .get(process.env.REACT_APP_SERVER_URL + "/signout")
            .then((res) => {
              dispatch(init());
              console.log("logout");
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      >
        {"logout"}
      </button>
    </div>
  );
}

export default Mypage;

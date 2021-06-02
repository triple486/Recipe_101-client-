import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import { useHistory, Switch } from "react-router-dom";

import { updateLogin } from "../../redux/userReducer";
import "../../css/Mypage/Modify.css";

export default function Modify() {
  let user = useSelector((state: RootState) => state.userReducer);
  console.log("userm", user);
  let userInfo = user.userInfo;
  let history = useHistory();
  let dispatch = useDispatch();
  // const [user.is, userLoginf] = useState(true)
  return (
    <>
      <Switch></Switch>
      <div className="Outline">
        <h1 className="text">Modify</h1>
        <div>
          <span>username : {userInfo.username}</span>
        </div>
        <div>
          <span>email : {userInfo.email}</span>
        </div>
        <div>
          <span>phone : {userInfo.phone}</span>
        </div>

        <button
          onClick={() => {
            history.push("/mypage/modify");
          }}
        >
          modify
        </button>
        <button
          onClick={() => {
            dispatch(updateLogin(false));
            history.push("/");

            // user.isLogin
            // userLoginf(false)
          }}
        >
          log out
        </button>
      </div>
    </>
  );
}

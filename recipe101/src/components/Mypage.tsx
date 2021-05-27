import { useSelector } from "react-redux";
import { RootState } from "../redux/reducers";
function Mypage() {
  let dummytoken = useSelector((state: RootState) => state.tokenReducer);
  let user = useSelector((state: RootState) => state.userReducer);

  console.log(typeof dummytoken, dummytoken);
  return (
    <div>
      <div>{"dummy token :" + dummytoken}</div>
      <div>{"is login :" + `${user.isLogin}`}</div>
      <div>{"user info :" + `${user.userInfo}`}</div>
    </div>
  );
}

export default Mypage;

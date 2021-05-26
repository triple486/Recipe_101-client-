import { useSelector } from "react-redux";
import { RootState } from "../redux/reducers";
function Mypage() {
  let dummytoken = useSelector((state: RootState) => state.tokenReducer);

  console.log(typeof dummytoken, dummytoken);
  return <div>{"dummy token :" + dummytoken}</div>;
}

export default Mypage;

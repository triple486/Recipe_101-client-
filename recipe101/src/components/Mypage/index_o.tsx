import styled from "styled-components";
import { useHistory } from "react-router-dom";
import "../../css/Mypage/MypageMain.css";
import Modify from "./Modify";
import PickedRecipe from "./PickedRecipe";
import AddedRecipe from "./AddedRecipe";
import MyReview from "./MyReview";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import { RootState } from "../../redux/reducers";
import {
  Init,
  isLoad,
  LoadComments,
  LoadRecipes,
  LoadStores,
} from "../../redux/mypageReducer";
axios.defaults.withCredentials = true;
const Frame = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: scroll;
`;

const InnerFrame = styled.div`
  height: 100%;
  width: 100%;
  max-width: 1200px;
`;
// 중괄호 안 ctrl + spacebar 눌러서 확인

function MypageMain() {
  let history = useHistory();
  let dispatch = useDispatch();

  let user = useSelector((state: RootState) => state.userReducer);
  let data = useSelector((state: RootState) => state.mypageReducer);
  let accessToken = useSelector((state: RootState) => state.tokenReducer);
  const config = {
    headers: {
      authorization: "bearer " + accessToken,
    },
  };
  if (!data.isLoad) {
    axios
      .all([
        axios.get(process.env.REACT_APP_SERVER_URL + `/store`, config),
        axios.get(
          process.env.REACT_APP_SERVER_URL +
            `/comment/user/${user.userInfo.userName}`,
          config
        ),
        axios.get(
          process.env.REACT_APP_SERVER_URL +
            `/search/username/${user.userInfo.userName}`,
          config
        ),
      ])
      .then((rst) => {
        dispatch(LoadStores(rst[0].data.data));
        dispatch(LoadComments(rst[1].data.data));
        dispatch(LoadRecipes(rst[2].data.data.recipe));
        dispatch(isLoad(true));
      });
  }
  console.log(data);
  return (
    <Frame>
      <InnerFrame>
        <div className="Outline">
          <h1 className="Logo">Recipe 101</h1>
          <div>
            {/* <button className="Recipeaddbutton">레시피 추가</button> */}
            <button
              onClick={() => {
                console.log(data);
              }}
            >
              테스트
            </button>
            <button
              className="Logout"
              onClick={() => {
                history.push("/");
                dispatch(Init());
              }}
            >
              돌아가기
            </button>
          </div>
          <Modify></Modify>
          <PickedRecipe></PickedRecipe>
          <AddedRecipe></AddedRecipe>
          <MyReview></MyReview>
        </div>
      </InnerFrame>
    </Frame>
  );
}

export default MypageMain;

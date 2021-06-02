import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import "../../css/Mypage/MypageMain.css";
import "../../css/Mypage/PickedRecipe.css";
import Content from "./Content";

import styled from "styled-components";

const Frame = styled.div`
  min-height: 300px
  width: 100%;
  display:flex;
  flex-wrap:wrap;

  align-items: center;
`;

// 중괄호 안 ctrl + spacebar 눌러서 확인
function AddedRecipe() {
  let data = useSelector((state: RootState) => state.mypageReducer);

  return (
    <>
      <div className="Outline">
        <h1 className="text">AddedRecipe</h1>
        <div className="content">
          <Frame>
            {data.recipes?.length
              ? data.recipes?.map((x, i) => {
                  return <Content key={i} data={x}></Content>;
                })
              : "비어있습니다."}
          </Frame>
        </div>
      </div>
    </>
  );
}

export default AddedRecipe;

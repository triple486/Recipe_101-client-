import { useHistory } from "react-router-dom";
import "../../css/Mypage/MypageMain.css";
import styled from "styled-components";

// 중괄호 안 ctrl + spacebar 눌러서 확인

interface data {
  id?: number;
  foodName?: string;
  imgUrl?: string;
  level?: string;
  comment?: string;
  cookingTime?: string;
  score?: number;
}

const Frame = styled.div`
  height: 300px;
  width: 300px;
  display: flex;
  flex-direction: column;
`;

const Frame2 = styled.div`
  height: 100px;
  width: 300px;
  display: flex;
  flex-direction: column;
`;
const Line = styled.div`
  flex: 1 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Img = styled.img`
  width: 260px;
  display: block;
`;

const TextBox = styled.div`
  display: flex;
`;
function Content({ data }: { data: data }) {
  let history = useHistory();
  return (
    <>
      {data.comment ? (
        <Frame2>
          <Line>
            <TextBox>{"요리명"}</TextBox>
            <TextBox>{data.foodName}</TextBox>
          </Line>
          <Line>
            <TextBox>{"평점"}</TextBox>
            <TextBox>{data.score}</TextBox>
          </Line>
          <Line>
            <TextBox>{"감상평"}</TextBox>
            <TextBox>{data.comment}</TextBox>
          </Line>
        </Frame2>
      ) : (
        <Frame
          onClick={() => {
            history.push(`/recipe/${data.id}`);
          }}
        >
          <Img className="content-pic" src={data.imgUrl} />
          <div className="content-title">{data.foodName}</div>
          <div className="bottom-desc">
            {data.score == null ? 0 : data.score}
          </div>
        </Frame>

        // <div></div>
      )}
    </>
  );
}

export default Content;

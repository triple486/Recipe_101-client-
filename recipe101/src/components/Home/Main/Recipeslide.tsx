import styled from "styled-components";
import "../../../css/Home/Recipeslide.css";
import { useHistory } from "react-router-dom";

const Frame = styled.div`
  display: flex;
  height: 100%;
  flex: 0 0 1;
  flex-direction: row;
  // border: solid 1px black;
`;
const ImgBox = styled.div`
  display: flex;
  flex: 1 0 0;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  height: 670px;
  width: 670px;
  display: block;
  object-fit: cover;
  border: solid 1px white;
  &:hover {
    cursor: pointer;
  }
`;

const DataBox = styled.div`
  flex: 1 0 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  color: white;
`;

interface recipe {
  food_id?: number;
  food_name?: string;
  food_img?: string;
  level?: string;
  cooking_time?: string;
  summary?: string;
  count?: number | null;
  nation?: string;
}

function Recipeslide({ data }: { data: recipe }) {
  let history = useHistory();
  return (
    <Frame>
      <ImgBox>
        <Image
          src={data.food_img}
          alt={data.food_name}
          onClick={() => {
            history.push(`/recipe/${data.food_id}`);
          }}
        />
      </ImgBox>
      <DataBox>
        <div
          className="recipeslide_desc food_name"
          onClick={() => {
            history.push(`/recipe/${data.food_id}`);
          }}
        >
          {data.food_name}
        </div>
        <div className="recipeslide_desc summary">{data.summary}</div>
        <div className="recipeslide_desc level">난이도: {data.level}</div>
        <div className="recipeslide_desc cooking_time">
          조리 시간: {data.cooking_time}
        </div>
        <div className="recipeslide_desc nation">요리 국적: {data.nation}</div>
      </DataBox>
    </Frame>
  );
}

export default Recipeslide;

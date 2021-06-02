import styled from "styled-components";
import "../../../css/Home/Mainslide.css";

const Frame = styled.div`
  display: flex;
  height: 100%;
  flex: 0 0 1;
  flex-direction: row;
  border: solid 1px black;
`;
const ImgBox = styled.div`
  display: flex;
  flex: 2 0 0;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  height: 300px;
  width: 300px;
  display: flex;
  border-radius: 10px;
  border: solid 10px brown;
`;
const DataBox = styled.div`
  flex: 3 0 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

interface recipe {
  food_id?: number;
  food_name?: string;
  food_img?: string;
  level?: string;
  cooking_time?: string;
  summary?: string;
  count?: number | null;
}

function Recipeslide({ data }: { data: recipe }) {
  return (
    <Frame>
      <ImgBox>
        <Image src={data.food_img} alt={data.food_name} />
      </ImgBox>
      <DataBox>
        <div>{data.food_name}</div>
        <div>{data.level}</div>
        <div>{data.cooking_time}</div>
        <div>{data.summary}</div>
      </DataBox>
    </Frame>
  );
}

export default Recipeslide;

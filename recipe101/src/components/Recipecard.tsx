import styled from "styled-components";
import { useHistory } from "react-router-dom";

const Frame = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 20px;
  flex-direction: column;
`;
const InnerFrame = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  border: solid 1px white;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  display: block;
  object-fit: fill;
`;
const Desc = styled.div`
  height: 20%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;
const Box = styled.div`
  flex: 1 0 1;
`;

function Recipecard({
  data,
}: {
  data: {
    id?: number;
    food_id?: number;
    food_img: string;
    imgUrl: string;
    food_name: string;
    foodName: string;
    level: string;
    cooking_time: string;
    cookingTime: string;
  };
}) {
  let history = useHistory();
  console.log(data);
  return (
    <Frame>
      <InnerFrame
        onClick={() => {
          history.push(`/recipe/${data.food_id || data.id}`);
        }}
      >
        <Image src={data.food_img || data.imgUrl}></Image>
        <Desc>
          <Box>{data.food_name || data.foodName}</Box>
          <Box>{data.level}</Box>
          <Box>{data.cooking_time || data.cookingTime}</Box>
        </Desc>
      </InnerFrame>
    </Frame>
  );
}

export default Recipecard;

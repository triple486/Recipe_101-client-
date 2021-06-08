import styled from "styled-components";
import { useHistory } from "react-router-dom";

const Frame = styled.div`
  display: flex;
  width: calc(25% - 60px);
  height: 330px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 1px solid white;
  margin: 30px;
  color: white;
`;

const Image = styled.img`
  height: 80%;
  width: 80%;
  display: flex;
  border: 1px solid white;
  &:hover {
    cursor: pointer;
  }
`;

const ImageBox = styled.div`
  height: 80%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 4%;
`;

const Desc = styled.div`
  height: 20%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  font-size: 1.7em;
  letter-spacing: 1px;
  padding-bottom: 8%;
`;
const Box = styled.div`
  flex: 1 0 1;
  &:hover {
    cursor: pointer;
  }
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
      {/* <InnerFrame */}

      {/* > */}
      <ImageBox>
        <Image
          src={data.food_img || data.imgUrl}
          onClick={() => {
            history.push(`/recipe/${data.food_id || data.id}`);
          }}
        ></Image>
      </ImageBox>
      <Desc>
        <Box
          onClick={() => {
            history.push(`/recipe/${data.food_id || data.id}`);
          }}
        >
          {data.food_name || data.foodName}
        </Box>
        {/* <Box>{data.level}</Box>
        <Box>{data.cooking_time || data.cookingTime}</Box> */}
      </Desc>
      {/* </InnerFrame> */}
    </Frame>
  );
}

export default Recipecard;

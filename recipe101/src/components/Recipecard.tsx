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
  border: solid 1px black;
`;

const Image = styled.img`
  height: ${Math.floor((window.innerHeight - 200) / 3) - 80}px;
  width: 100%;
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
    food_id: number;
    food_img: string;
    food_name: string;
    level: string;
    cooking_time: string;
  };
}) {
  let history = useHistory();

  return (
    <Frame>
      <InnerFrame
        onClick={() => {
          history.push(`/recipe/${data.food_id}`);
        }}
      >
        <Image src={data.food_img}></Image>
        <Desc>
          <Box>{data.food_name}</Box>
          <Box>{data.level}</Box>
          <Box>{data.cooking_time}</Box>
        </Desc>
      </InnerFrame>
    </Frame>
  );
}

export default Recipecard;

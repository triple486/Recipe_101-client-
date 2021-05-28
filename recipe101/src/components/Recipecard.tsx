import styled from "styled-components";

const Frame = styled.div<{ width: number; height: number }>`
  display: flex;
  flex: 0 0 1;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  padding: 20px;
  flex-direction: column;
  border: solid 1px black;
`;

const Image = styled.img<{ height: number }>`
  height: ${(props) => Math.floor(props.height * 0.8)}px;
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
  width,
  height,
}: {
  data: {
    food_id: number;
    food_img: string;
    food_name: string;
    level: string;
    cooking_time: string;
  };
  width: number;
  height: number;
}) {
  return (
    <Frame width={width} height={height}>
      <Image src={data.food_img} height={height}></Image>
      <Desc>
        <Box>{data.food_name}</Box>
        <Box>{data.level}</Box>
        <Box>{data.cooking_time}</Box>
      </Desc>
    </Frame>
  );
}

export default Recipecard;

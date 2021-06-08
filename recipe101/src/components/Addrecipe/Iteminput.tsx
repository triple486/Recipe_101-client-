import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/reducers";
import { deleteOneIngredient } from "../../redux/addrecipeReducer";
const Frame = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
`;
const NameArea = styled.div`
  flex: 1 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 1px white;
`;
const NameBox = styled.div`
  background-color: white;
  height: 100%;
  width: 100%;
  font-size: 20px;
  display: flex;
  justify-content: center;
  background-color: #b17d55;
  align-items: center;
  flex-direction: column;
`;

const ItemArea = styled.div`
  flex: 16 0 0;
  display: flex;
  flex-wrap: wrap;
  overflow-y: scroll;
`;

const ButtonArea = styled.div`
  flex: 4 0 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const ItemLine = styled.div`
  flex: 1 0 0;
  display: flex;
  flex-direction: row;
`;

const ItemBox = styled.div`
  display: flex;
  width: 20%;
  height: 75%;
  justify-content: center;
  align-items: center;
`;
const ItemInnerBox = styled.div`
  display: flex;
  width: 90%;
  height: 90%;
  flex-direction: column;
  border: solid 1px white;
`;

const CancelButton = styled.button`
  height: 15px;
  width: 15px;
  display: flex;
  padding: 2px;
  justify-content: center;
  align-items: center;
  background-color: #b17d55;
  border: solid 1px white;
`;

const BTBOX = styled.div`
  display: flex;
  font-size: 5px;
`;

const Button = styled.button`
  height: 90%;
  width: 90%;
  border: solid 1px #dfdfdf;
  background-color: #f6eace;
  color: black;
  padding: 5px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 14px;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
  cursor: pointer;

  &:hover {
    border: solid 1px white;
    // background-color: white;
    // opacity: 0.7;
    // color: black;
`;

const Frameline = styled.div`
  flex: 1 0 0;
  width: 100%;
  display: flex;
  padding-left: 10px;
  padding-right: 10px;
  justify-content: space-around;
  flex-direction: row;
`;
const FrameBox = styled.div`
  flex: 1 0 0;
  width: 100%;
  display: flex;

  flex-direction: column;
`;
const ButtonLine = styled.div`
  flex: 0 0 1;
  height: 10px;
  display: flex;
  flex-direction: row-reverse;
`;

const Label = styled.div`
  font-size: 15px;
  text-align: right;
  flex: 1 0 0;
`;
const Text = styled.div`
  font-size: 15px;
  text-align: right;
  flex: 2 0 0;
`;
function ItemBoxFrame({
  id = 0,
  name = "",
  type = "",
  cap = "",
}: {
  id?: number;
  name?: string;
  type?: string;
  cap?: string;
}) {
  let dispatch = useDispatch();

  return (
    <ItemBox>
      <ItemInnerBox>
        <ButtonLine>
          <CancelButton
            onClick={() => {
              dispatch(deleteOneIngredient(id));
            }}
          >
            <BTBOX>&times;</BTBOX>
          </CancelButton>
        </ButtonLine>
        <FrameBox>
          <Frameline>
            <Label>{"종류"}</Label>
            <Text>{type}</Text>
          </Frameline>
          <Frameline>
            <Label>{"이름"}</Label>
            <Text>{name}</Text>
          </Frameline>
          <Frameline>
            <Label>{"양"}</Label>
            <Text>{cap}</Text>
          </Frameline>
        </FrameBox>
      </ItemInnerBox>
    </ItemBox>
  );
}

export default function Iteminput({ func }: { func: Function }) {
  let { Ingredient } = useSelector(
    (state: RootState) => state.addrecipeReducer
  );
  return (
    <Frame>
      <NameArea>
        <NameBox>
          <ItemLine></ItemLine>
          <ItemLine>{"재"}</ItemLine>
          <ItemLine></ItemLine>
          <ItemLine>{"료"}</ItemLine>
          <ItemLine></ItemLine>
        </NameBox>
      </NameArea>
      <ItemArea>
        {Ingredient.map((x, i) => {
          return <ItemBoxFrame key={i} id={i} {...x}></ItemBoxFrame>;
        })}
      </ItemArea>
      <ButtonArea>
        <Button
          onClick={() => {
            func(true);
          }}
        >
          재료 추가
        </Button>
      </ButtonArea>
    </Frame>
  );
}

import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {} from "../../redux/addrecipeReducer";
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
  border: solid 1px red;
`;
const NameBox = styled.div`
  height: 100%;
  width: 100%;
  font-size: 20px;
  display: flex;
  justify-content: center;
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
  width: 10%;
  height: 50%;
  flex-direction: column;
  border: solid 1px red;
`;

const CancelButton = styled.button`
  height: 10px;
  width: 10px;
  display: flex;
  border-radius: 50%;
  padding: 2px;
  background-color: grey;
`;

const Button = styled.button`
  height: 90%;
  width: 90%;
`;

const Frameline = styled.div`
  flex: 1 0 0;
  width: 100%;
  display: flex;
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
      <ButtonLine>
        <CancelButton
          onClick={() => {
            dispatch(deleteOneIngredient(id));
          }}
        />
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

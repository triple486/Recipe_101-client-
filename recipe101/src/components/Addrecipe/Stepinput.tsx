import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/reducers";
import {
  deleteOneRecipe,
  deleteOneStepImage,
} from "../../redux/addrecipeReducer";
const Frame = styled.div`
  width: 100%;
  height: 100%;
  display: flex;

  flex-direction: column;
`;
const StepLine = styled.div`
  height: 100px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 1px white;
`;

const Addstep = styled.div`
  margin: 10px 0;
  min-height: 50px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: dashed 1px white;
  &:hover {
    border: solid 1px white;
    // background-color: #f6eace;
    cursor: pointer;
`;
const TextBox = styled.div``;

const StepBox = styled.div`
  width: 100%;
  flex: 1 0 0;
  display: flex;
  overflow-y: scroll;
  flex-direction: column;
`;
const NumberBox = styled.div`
  flex: 1 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Imgbox = styled.div`
  height: 100px;
  width: 100px;
`;
const Img = styled.img`
  height: 100px;
  width: 100px;
`;
const Descbox = styled.div`
  flex: 5 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Tipbox = styled.div`
  flex: 3 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CancelButton = styled.button`
  height: 40px;
  width: 60px;
  display: flex;
  padding: 2px;
  justify-content: center;
  align-items: center;
  background-color: #f6eace;
  border-radius: 10px;
`;

const BTBOX = styled.div`
  display: flex;
`;

function RecipeStep({
  id = 0,
  num = 0,
  desc = "",
  tip = "",
  img = "",
}: {
  id?: number;
  num?: number;
  desc?: string;
  tip?: string;
  img?: any;
}) {
  let dispatch = useDispatch();

  return (
    <StepLine>
      <NumberBox>
        <TextBox>{num}</TextBox>
      </NumberBox>
      <Imgbox>{img ? <Img src={img} alt={""} /> : null}</Imgbox>
      <Descbox>
        <TextBox>{desc}</TextBox>
      </Descbox>
      <Tipbox>
        <TextBox>{tip}</TextBox>
      </Tipbox>
      <CancelButton
        onClick={() => {
          dispatch(deleteOneStepImage(id));
          dispatch(deleteOneRecipe(id));
        }}
      >
        <BTBOX>삭제</BTBOX>
      </CancelButton>
    </StepLine>
  );
}

export default function Stepinput({ func }: { func: Function }) {
  let { Recipe, StepImage } = useSelector(
    (state: RootState) => state.addrecipeReducer
  );
  console.log(StepImage);
  return (
    <Frame>
      <StepBox>
        {[
          ...Recipe.map((x, i) => {
            return (
              <RecipeStep
                key={i}
                id={i}
                num={x.cookingNo}
                desc={x.cookingDc}
                tip={x.stepTip}
                img={StepImage[i].imgpath}
              ></RecipeStep>
            );
          }),
          <Addstep
            key={-1}
            onClick={() => {
              func(true);
            }}
          >
            <TextBox>{"레시피 단계 추가"}</TextBox>
          </Addstep>,
        ]}
      </StepBox>
    </Frame>
  );
}

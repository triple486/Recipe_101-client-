import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/reducers";
import {
  deleteOneIngredient,
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
  border: solid 1px black;
`;

const Addstep = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  border: dashed 1px black;
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
  height: 20px;
  width: 20px;
  display: flex;
  border-radius: 50%;
  padding: 2px;
  background-color: grey;
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
      <Imgbox>
        <Img src={img} />
      </Imgbox>
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
      />
    </StepLine>
  );
}

export default function ({ func }: { func: Function }) {
  let { Recipe, StepImage } = useSelector(
    (state: RootState) => state.addrecipeReducer
  );
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
            <TextBox>{"레시피 추가"}</TextBox>
          </Addstep>,
        ]}
      </StepBox>
    </Frame>
  );
}

import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/reducers";
import {
  setFoodinfo,
  setIngredient,
  setRecipe,
} from "../../redux/addrecipeReducer";
import CancelButton from "../CancelButton";
import Input from "../Input";
import ImageUpload from "../ImageUpload";
import { useState } from "react";
import ItemInput from "./Iteminput";
import StepInput from "./Stepinput";
import { Route, Switch, useHistory } from "react-router-dom";
import Resister from "../Home/Resister";
import ItemModal from "./Inputitemmodal";
import StepModal from "./Inputstepmodal";
const Frame = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CancelFrame = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  top: 0;
`;

const DataFrame = styled.div`
  flex: 2 0 0;
  width: 100%;
  display: flex;
  max-width: 1200px;
  flex-direction: row;
  border: solid 1px red;
`;

const ItemFrame = styled.div`
  flex: 1 0 0;
  width: 100%;
  max-width: 1200px;
  display: flex;
  border: solid 1px blue;
`;

const StepFrame = styled.div`
  flex: 3 0 0;
  width: 100%;
  max-width: 1200px;
  border: solid 1px blue;
`;
const ImgBox = styled.div`
  flex: 1 0 0;

  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 1px red;
`;
const TextBox = styled.div`
  flex: 2 0 0;
  border: solid 1px red;
  display: flex;
  flex-direction: column;
`;

const Image = styled.img`
  max-height: 100%;
  max-width: 100%;
  display: flex;
  object-fit: contain;
`;
const ShowBox = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Button = styled.button`
  height: 30px;
  width: 100%;
`;
const Textupper = styled.div`
  flex: 3 0 0;
  display: flex;
  flex-direction: row;
  border: solid 1px red;
`;
const Textlower = styled.div`
  flex: 1 0 0;
  display: flex;
  flex-direction: row;
  border: solid 1px red;
`;

const TextColumn = styled.div`
  flex: 1 0 0;
  display: flex;
  flex-direction: column;
  border: solid 1px red;
`;

const FoodDescName = styled.div`
  display: flex;
  font-size: 20px;
  flex: 1 0 0;
  flex-direction: column;
  align-items: center;
`;
const FoodDescNameLine = styled.div`
  font-size: 20px;
  flex: 1 0 0;
`;

const FoodDescTextbox = styled.textarea`
  display: flex;
  flex: 5 0 0;
  resize: none;
`;

const Dummy = styled.div`
  flex: 1 0 0;
`;

const RecipeAddButton = styled.button`
  width: 100%;
  max-width: 1200px;
  height: 30px;
`;
interface itemobj {
  name: string;
  type: string;
  cap: string;
}

interface stepobj {
  name: string;
  type: string;
  cap: string;
}

//foodName, summary, nation, ,cookingTime, calorie, qnt, level
function Addrecipe() {
  let user = useSelector((state: RootState) => state.userReducer);
  let data = useSelector((state: RootState) => state.addrecipeReducer);
  let history = useHistory();
  let dispatch = useDispatch();
  let [foodimage, foodimagef] = useState<any>("");
  let [imageon, setimageon] = useState<boolean>(false);

  let [isinputigr, setinputigr] = useState<boolean>(false);
  let [isinputstep, setinputstep] = useState<boolean>(false);

  console.log(data);

  function inputf(type: string) {
    let sdata: any = {};
    return (v: string) => {
      sdata[type] = v;
      dispatch(setFoodinfo({ ...sdata }));
    };
  }

  return (
    <Frame>
      <CancelFrame>
        <CancelButton to={"/"}></CancelButton>
      </CancelFrame>
      <DataFrame>
        <ImgBox>
          {foodimage === "" ? (
            <ImageUpload
              func={(x: any) => {
                foodimagef(x);
                setimageon(true);
              }}
            />
          ) : (
            <ShowBox>
              <Image src={URL.createObjectURL(foodimage[0])}></Image>
              <Button
                onClick={() => {
                  foodimagef("");
                }}
              >
                취소
              </Button>
            </ShowBox>
          )}
        </ImgBox>
        <TextBox>
          <Textupper>
            <TextColumn>
              <Input
                label={"요리 명"}
                type={"text"}
                bfunc={inputf("foodName")}
                placeholder={"ex) 미역국, 감자국, ..."}
              ></Input>
              <Input
                label={"조리 시간"}
                type={"text"}
                bfunc={inputf("cookingTime")}
                placeholder={"ex) 10분, 20분, 30분, ..."}
              ></Input>
              <Input
                label={"요리 국적"}
                type={"text"}
                bfunc={inputf("nation")}
                placeholder={"ex) 한국, 미국, 퓨전, ..."}
              ></Input>
              <Input
                label={"요리 종류"}
                type={"text"}
                bfunc={inputf("type")}
                placeholder={"ex) 밥, 국, 튀김, ..."}
              ></Input>
            </TextColumn>

            <TextColumn>
              <Input
                label={"난이도"}
                type={"text"}
                bfunc={inputf("level")}
                placeholder={"ex) 초보 환영, 보통, 어려움, ..."}
              ></Input>
              <Input
                label={"양"}
                type={"text"}
                bfunc={inputf("qnt")}
                placeholder={"ex) 1인분, 2인분, 3인분, ..."}
              ></Input>
              <Input
                label={"칼로리"}
                type={"text"}
                bfunc={inputf("calorie")}
                placeholder={"ex) 100Kcal, 200Kcal, 300Kcal, ..."}
              ></Input>
              <Dummy></Dummy>
            </TextColumn>
          </Textupper>
          <Textlower>
            <FoodDescName>
              <FoodDescNameLine>{"요리에 대한"}</FoodDescNameLine>
              <FoodDescNameLine>{"간단한 설명"}</FoodDescNameLine>
            </FoodDescName>
            <FoodDescTextbox
              onBlur={(e) => {
                dispatch(setFoodinfo({ summary: e.target.value }));
              }}
            ></FoodDescTextbox>
          </Textlower>
        </TextBox>
      </DataFrame>
      <ItemFrame>
        <ItemInput func={setinputigr}></ItemInput>
      </ItemFrame>
      <StepFrame>
        <StepInput func={setinputstep}></StepInput>
      </StepFrame>
      <RecipeAddButton onClick={() => {}}>{"레시피 추가"}</RecipeAddButton>
      {isinputigr ? <ItemModal func={setinputigr}></ItemModal> : null}
      {isinputstep ? <StepModal func={setinputstep}></StepModal> : null}
    </Frame>
  );
}

export default Addrecipe;

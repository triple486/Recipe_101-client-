import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/reducers";
import {
  setFoodinfo,
  setFoodImage,
  initial,
} from "../../redux/addrecipeReducer";
import Input from "../Input";
import ImageUpload from "../ImageUpload";
import { useState } from "react";
import ItemInput from "./Iteminput";
import StepInput from "./Stepinput";
import { useHistory } from "react-router-dom";
import ItemModal from "./Inputitemmodal";
import StepModal from "./Inputstepmodal";
import Message from "./messagebox";
import axios from "axios";
axios.defaults.withCredentials = true;
const Frame = styled.div`
  background-color: #b17d55;
  height: 100%;
  width: 100%;
  display: flex;
  color: white;

  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CancelFrame = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  top: 0;
  flex-direction: row-reverse;
`;

const DataFrame = styled.div`
  flex: 2 0 0;
  width: 100%;
  display: flex;
  max-width: 1200px;
  flex-direction: row;
  border: solid 1px white;
`;

const ItemFrame = styled.div`
  flex: 1 0 0;
  width: 100%;
  max-width: 1200px;
  min-height: 150px;
  display: flex;
  border: solid 1px white;
`;

const StepFrame = styled.div`
  flex: 3 0 0;
  width: 100%;
  max-width: 1200px;
  border: solid 1px white;
`;
const ImgBox = styled.div`
  flex: 1 0 0;

  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 1px white;
`;
const TextBox = styled.div`
  flex: 2 0 0;
  border: solid 1px white;
  display: flex;
  flex-direction: column;
`;

const Image = styled.img`
  height: 279px;
  width: 385px;
  display: block;
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
  border: solid 1px white;
`;
const Textlower = styled.div`
  flex: 1 0 0;
  display: flex;
  flex-direction: row;
  border: solid 1px white;
`;

const TextColumn = styled.div`
  flex: 1 0 0;
  display: flex;
  flex-direction: column;
  border: solid 1px #b17d55;
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
  border: solid 1px black;
`;

const Dummy = styled.div`
  flex: 1 0 0;
`;

const ImgBox2 = styled.div`
  flex: 1 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const ImgBox3 = styled.div`
  flex: 1 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const RecipeAddButton = styled.button`
  width: 100%;
  max-width: 1200px;
  height: 60px;
  background-color: #f6eace;
  border: 1px white solid;
  &:hover {
    cursor: pointer;
  }
`;

const CancelButton = styled.button`
  height: 40px;
  width: 80px;
  display: flex;
  padding: 2px;
  justify-content: center;
  align-items: center;
  background-color: #f6eace;
  border-radius: 10px;
`;

const BTBOX = styled.div`
  display: flex;
  background-color: #f6eace;
  &:hover {
    cursor: pointer;
  }
`;

//foodName, summary, nation, ,cookingTime, calorie, qnt, level
function Addrecipe() {
  let user = useSelector((state: RootState) => state.userReducer);
  let data = useSelector((state: RootState) => state.addrecipeReducer);
  let accessToken = useSelector((state: RootState) => state.tokenReducer);
  let history = useHistory();
  let dispatch = useDispatch();

  let [isinputigr, setinputigr] = useState<boolean>(false);
  let [isinputstep, setinputstep] = useState<boolean>(false);
  let [ismessage, setmessage] = useState<boolean>(false);
  let [ismessage2, setmessage2] = useState<boolean>(false);

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
        <CancelButton
          onClick={() => {
            dispatch(initial());
            history.push("/");
          }}
        >
          <BTBOX> {"돌아가기"}</BTBOX>
        </CancelButton>
      </CancelFrame>
      <DataFrame>
        <ImgBox>
          {data.FoodImage.isin ? (
            <ShowBox>
              <ImgBox2>
                <ImgBox3>
                  <Image
                    src={
                      typeof data.FoodImage.imgpath === "string"
                        ? data.FoodImage.imgpath
                        : ""
                    }
                  ></Image>
                </ImgBox3>
              </ImgBox2>
              <Button
                onClick={() => {
                  dispatch(setFoodImage({ isin: false }));
                }}
              >
                취소
              </Button>
            </ShowBox>
          ) : (
            <ImageUpload
              name={"foodimg"}
              func={(files: any) => {
                dispatch(
                  setFoodImage({
                    file: files[0],
                    imgpath: URL.createObjectURL(files[0]),
                    isin: true,
                  })
                );
              }}
            />
          )}
        </ImgBox>
        <TextBox>
          <Textupper>
            <TextColumn>
              <Input
                label={"요리 명"}
                type={"text"}
                value={data.Food_info.foodName || ""}
                func={inputf("foodName")}
                placeholder={"ex) 미역국, 감자국, ..."}
              ></Input>
              <Input
                label={"조리 시간"}
                type={"text"}
                value={data.Food_info.cookingTime || ""}
                func={inputf("cookingTime")}
                placeholder={"ex) 10분, 20분, 30분, ..."}
              ></Input>
              <Input
                label={"요리 국적"}
                type={"text"}
                value={data.Food_info.nation || ""}
                func={inputf("nation")}
                placeholder={"ex) 한국, 미국, 퓨전, ..."}
              ></Input>
              <Input
                label={"요리 종류"}
                type={"text"}
                value={data.Food_info.type || ""}
                func={inputf("type")}
                placeholder={"ex) 밥, 국, 튀김, ..."}
              ></Input>
            </TextColumn>

            <TextColumn>
              <Input
                label={"난이도"}
                type={"text"}
                value={data.Food_info.level || ""}
                func={inputf("level")}
                placeholder={"ex) 초보 환영, 보통, 어려움, ..."}
              ></Input>
              <Input
                label={"양"}
                type={"text"}
                value={data.Food_info.qnt || ""}
                func={inputf("qnt")}
                placeholder={"ex) 1인분, 2인분, 3인분, ..."}
              ></Input>
              <Input
                label={"칼로리"}
                type={"text"}
                value={data.Food_info.calorie || ""}
                func={inputf("calorie")}
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
      <RecipeAddButton
        onClick={() => {
          let rdata = new FormData();
          if (data.FoodImage.file) {
            rdata.append("foodImage", data.FoodImage.file);
          }
          rdata.append("Food_info", JSON.stringify(data.Food_info));
          rdata.append("Ingredients", JSON.stringify([...data.Ingredient]));
          rdata.append("Recipe", JSON.stringify(data.Recipe));
          data.StepImage.forEach((x) => {
            rdata.append("stepImages", x.file);
          });

          if (user.isLogin) {
            const config = {
              headers: {
                "content-type": "multipart/form-data",
                authorization: "bearer " + accessToken,
              },
            };
            axios
              .post(process.env.REACT_APP_SERVER_URL + "/recipe", rdata, config)
              .then((rst) => {
                dispatch(initial());
                setmessage2(true);
              })
              .catch((err) => {
                console.log("fail");
              });
          } else {
            setmessage(true);
          }
        }}
      >
        {"레시피 추가"}
      </RecipeAddButton>
      {isinputigr ? <ItemModal func={setinputigr}></ItemModal> : null}
      {isinputstep ? <StepModal func={setinputstep}></StepModal> : null}
      {ismessage ? (
        <Message
          cancel={() => {
            setmessage(false);
          }}
          message={"레시피 추가에는 회원가입된 계정을 필요로 합니다."}
          button={() => {
            setmessage(false);
            history.push("/");
          }}
          buttonMessage={"예"}
        ></Message>
      ) : null}
      {ismessage2 ? (
        <Message
          cancel={() => {
            setmessage2(false);
          }}
          message={"레시피가 추가되었습니다. 홈화면으로 돌아가시겠습니까?"}
          button={() => {
            history.push("/");
            setmessage2(false);
          }}
          buttonMessage={"예"}
        ></Message>
      ) : null}
    </Frame>
  );
}

export default Addrecipe;

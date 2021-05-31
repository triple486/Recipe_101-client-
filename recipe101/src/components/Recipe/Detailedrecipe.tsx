import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import {
  Route,
  Switch,
  useHistory,
  useLocation,
  Link,
  Redirect,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const Frame = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  padding: 0;
  margin: 0;
  overflow-y: scroll;
  justify-content: center;
`;
const InnerFrame = styled.div`
  height: 100%;
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
interface Boxset {
  h?: number;
  c?: boolean;
}
const BoxFrame = styled.div<Boxset>`
  height: ${({ h }) => (h ? h : 100)}px;
  width: 100%;
  display: flex;
  flex-direction: ${({ c }) => (c ? "column" : "row")};
  border: solid 1px red;
`;

const MinBoxFrame = styled.div<Boxset>`
  min-height: ${({ h }) => (h ? h : 100)}px;
  width: 100%;
  display: flex;
  flex-direction: ${({ c }) => (c ? "column" : "row")};
  border: solid 1px red;
`;

const NaviBar = styled.div`
  height: 200px;
  width: 100px;
  position: fixed;
  right: 2%;
  top: 50px;
  z-order: 2;
  border: solid 1px red;
`;

const Img = styled.img`
  height: 400px;
  width: 400px;
`;
const BasicDataBox = styled.div`
  flex: 1 0 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  border: solid 1px red;
`;

interface Lineset {
  f?: number;
  c?: boolean;
}

const Line = styled.div<Lineset>`
  flex: ${({ f }) => (f ? f : 1)} 0 0;
  display: flex;
  flex-direction: ${({ c }) => (c ? "column" : "row")};
  justify-content: center;
  align-items: center;
  border: solid 1px red;
`;
interface Flineset {
  h?: number;
  c?: boolean;
}

const FLine = styled.div<Flineset>`
  height: ${({ h }) => (h ? h : 100)}px;
  display: flex;
  flex-direction: ${({ c }) => (c ? "column" : "row")};
  justify-content: center;
  align-items: center;
  border: solid 1px red;
`;

const ButtonLine = styled.div`
  height: 20px;
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
`;
const Button = styled.button`
  height: 20px;
  display: flex;
`;

const TextBox = styled.div<{ s?: number; w?: number }>`
  display: flex;
  ${({ s }) => (s ? `font-size: ${s}px;` : null)}
  ${({ w }) => (w ? `font-weight: ${w};` : null)}
`;

interface Food_info {
  id: number;
  userName: string;
  foodName: string;
  summary: string;
  nation: string;
  type: string;
  cookingTime: string;
  calorie: string;
  qnt: string;
  level: string;
  imgUrl: string;
  createdAt: string;
  updatedAt: string;
}

interface Ingredients {
  name: string;
  type: string;
  cap: string;
}
interface Recipe {
  cookingNo: number;
  cookingDc: string;
  stepImage: string;
  stepTip: string;
}
interface Recipe_info {
  food_info?: Food_info;
  Ingredients?: Ingredients[];
  Recipes?: Recipe[];
}

function Detailedrecipe() {
  let { id } = useParams<{ id?: string }>();
  let history = useHistory();
  let [data, setdata] = useState<Recipe_info>({});
  if (!data.food_info) {
    axios
      .get(process.env.REACT_APP_SERVER_URL + `/recipe/${id}`)
      .then((rst) => {
        console.log(rst);
        setdata({ ...rst.data.data });
      });
  }
  console.log(data.Recipes);
  return (
    <Frame>
      <InnerFrame>
        {/* <NaviBar></NaviBar> */}
        <ButtonLine>
          <Button
            onClick={() => {
              history.goBack();
            }}
          >
            {"돌아가기"}
          </Button>
        </ButtonLine>
        <BoxFrame h={400}>
          <Img src={data.food_info?.imgUrl}></Img>
          <BasicDataBox>
            <Line>
              <TextBox s={40} w={700}>
                {data.food_info?.foodName}
              </TextBox>
            </Line>

            <Line>
              <Line>
                <TextBox>{data.food_info?.userName}</TextBox>
              </Line>
              <Line>
                <TextBox>{data.food_info?.level}</TextBox>
              </Line>
            </Line>
            <Line>
              <Line>
                <TextBox>{data.food_info?.nation}</TextBox>
              </Line>
              <Line>
                <TextBox>{data.food_info?.qnt}</TextBox>
              </Line>
            </Line>
            <Line>
              <Line>
                <TextBox>{data.food_info?.type}</TextBox>
              </Line>
              <Line>
                <TextBox>{data.food_info?.cookingTime}</TextBox>
              </Line>
            </Line>
            <Line>
              <Line>
                <TextBox>{data.food_info?.createdAt}</TextBox>
              </Line>
              <Line>
                <TextBox>{data.food_info?.updatedAt}</TextBox>
              </Line>
            </Line>
          </BasicDataBox>
        </BoxFrame>
        <BoxFrame h={200}>
          <Line c={true}>
            <Line>
              <TextBox>{"설명"}</TextBox>
            </Line>
            <Line f={4}>
              <TextBox>{data.food_info?.summary}</TextBox>
            </Line>
          </Line>
        </BoxFrame>
        <MinBoxFrame h={400} c={true}>
          <Line>
            <Line>
              <TextBox>{"주재료"}</TextBox>
            </Line>
            <Line>
              <TextBox>{"부재료"}</TextBox>
            </Line>
            <Line>
              <TextBox>{"양념"}</TextBox>
            </Line>
          </Line>
          <Line f={4}>
            <Line>{"1"}</Line>
            <Line>{"2"}</Line>
            <Line>{"3"}</Line>
          </Line>
        </MinBoxFrame>
        <MinBoxFrame h={500} c={true}>
          {data.Recipes?.map((x, i) => {
            return (
              <FLine key={i}>
                <TextBox>{`${x.cookingNo} : ${x.cookingDc} - ${x.stepTip}`}</TextBox>
              </FLine>
            );
          })}
        </MinBoxFrame>
        <BoxFrame h={200}>{"코멘트 입력창"}</BoxFrame>
        <MinBoxFrame h={0} c={true}>
          <FLine>
            <TextBox>{"1"}</TextBox>
          </FLine>
          <FLine>
            <TextBox>{"2"}</TextBox>
          </FLine>
          <FLine>
            <TextBox>{"3"}</TextBox>
          </FLine>
        </MinBoxFrame>
      </InnerFrame>
    </Frame>
  );
}

export default Detailedrecipe;

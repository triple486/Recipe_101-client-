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
import StepBox from "./StepBox";
import LabelBox from "./LabelBox";

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
  flex-direction: row;
  flex-wrap: wrap;
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
  flex: 1 0 1;
  width: 100%;
  position: releative;
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
  line?: boolean;
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

const Modal = styled.div`
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const IMG = styled.img`
  max-height: 100%;
  max width : 100%;

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
interface Image_extend {
  isEx?: boolean;
  image?: string;
}

function Detailedrecipe() {
  let { id } = useParams<{ id?: string }>();
  let history = useHistory();
  let [data, setdata] = useState<Recipe_info>({});
  let [iex, setiex] = useState<Image_extend>({ isEx: false });
  if (!data.food_info) {
    axios
      .get(process.env.REACT_APP_SERVER_URL + `/recipe/${id}`)
      .then((rst) => {
        console.log(rst);
        setdata({ ...rst.data.data });
      });
  }

  function Eximage() {
    return (
      <Modal
        onClick={() => {
          setiex({ ...iex, isEx: false });
        }}
      >
        <IMG src={iex.image}></IMG>
      </Modal>
    );
  }

  function timecutter(x: string) {
    return x.length ? x.split("T")[0].split("-").join(" / ") : x;
  }

  return (
    <Frame>
      <InnerFrame>
        {iex.isEx ? <Eximage></Eximage> : null}
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
                <LabelBox
                  l={"작성자"}
                  v={data.food_info?.userName || ""}
                ></LabelBox>
              </Line>
              <Line>
                <LabelBox
                  l={"요리 국적"}
                  v={data.food_info?.nation || ""}
                ></LabelBox>
              </Line>
            </Line>
            <Line>
              <Line>
                <LabelBox l={"분류"} v={data.food_info?.type || ""}></LabelBox>
              </Line>
              <Line>
                <LabelBox l={"분량"} v={data.food_info?.qnt || ""}></LabelBox>
              </Line>
            </Line>
            <Line>
              <Line>
                <LabelBox
                  l={"난이도"}
                  v={data.food_info?.level || ""}
                ></LabelBox>
              </Line>
              <Line>
                <LabelBox
                  l={"조리 시간"}
                  v={data.food_info?.level || ""}
                ></LabelBox>
              </Line>
            </Line>
            <Line>
              <Line>
                <LabelBox
                  l={"작성 일자"}
                  v={timecutter(data.food_info?.createdAt || "")}
                ></LabelBox>
              </Line>
              <Line>
                <LabelBox
                  l={"수정 일자"}
                  v={timecutter(data.food_info?.updatedAt || "")}
                ></LabelBox>
              </Line>
            </Line>
          </BasicDataBox>
        </BoxFrame>
        <MinBoxFrame h={200}>
          <Line c={true}>
            <Line>
              <TextBox s={20}>{"간단한 설명"}</TextBox>
            </Line>
            <Line f={4}>
              <TextBox>{data.food_info?.summary}</TextBox>
            </Line>
          </Line>
        </MinBoxFrame>
        <MinBoxFrame h={400} c={true}>
          <BoxFrame>
            <Line>
              <TextBox s={30}>{"주 재료"}</TextBox>
            </Line>
            <Line>
              <TextBox s={30}>{"부 재료"}</TextBox>
            </Line>
            <Line>
              <TextBox s={30}>{"양념"}</TextBox>
            </Line>
          </BoxFrame>
          <MinBoxFrame h={300}>
            <Line c={true}>
              {data.Ingredients?.filter((x) => x.type === "주재료").map(
                (x, i) => {
                  return <Line key={i}>{`${x.name} - ${x.cap}`}</Line>;
                }
              )}
            </Line>
            <Line c={true}>
              {data.Ingredients?.filter((x) => x.type === "부재료").map(
                (x, i) => {
                  return <Line key={i}>{`${x.name} - ${x.cap}`}</Line>;
                }
              )}
            </Line>
            <Line c={true}>
              {data.Ingredients?.filter((x) => x.type === "양념").map(
                (x, i) => {
                  return <Line key={i}>{`${x.name} - ${x.cap}`}</Line>;
                }
              )}
            </Line>
          </MinBoxFrame>
        </MinBoxFrame>
        <MinBoxFrame h={500} c={true}>
          {data.Recipes?.map((x, i) => {
            return (
              <FLine key={i}>
                <StepBox data={x} func={setiex}></StepBox>
              </FLine>
            );
          })}
        </MinBoxFrame>
        <MinBoxFrame h={200}>{"코멘트 입력창"}</MinBoxFrame>
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

import styled from "styled-components";

const Frame = styled.div`
  min-height: 100px;
  height: fit-content;
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const Box = styled.div`
  // height: 100px;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const NumBox = styled.div``;

const LongBox = styled.div`
  height: fit-content;
  flex: 1 0 0;
  display: flex;
  flex-direction: column;
  padding: 10px 0;
`;
const HLongBox = styled.div`
  width: 100%;
  flex: 1 0 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
`;

const InnerBox = styled.div`
  height: 80%;
  width: 80%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;
const Label = styled.div`
  width: 20%;
`;
const Text = styled.div`
  width: 70%;
`;

const IMG = styled.img`
  max-height: 80%;
  max-width: 100%;
  object-fit: cover;
  display: block;
  cursor: pointer;
`;

interface Recipe {
  cookingNo: number;
  cookingDc: string;
  stepImage: string;
  stepTip: string;
}
export default function StepBox({
  data,
  func = () => {},
}: {
  data?: Recipe;
  func?: Function;
}) {
  return (
    <Frame>
      <Box>
        <NumBox>{data?.cookingNo} </NumBox>
      </Box>
      <Box
        onClick={() => {
          func({ isEx: true, image: data?.stepImage });
        }}
      >
        <IMG
          src={data?.stepImage}
          alt={""}
          title={"클릭시 큰이미지로 확인 가능합니다."}
        ></IMG>
      </Box>
      <LongBox>
        <HLongBox>
          <InnerBox>
            <Label>{"단계 설명"}</Label>
            <Text>{data?.cookingDc}</Text>
          </InnerBox>
        </HLongBox>
        <HLongBox>
          <InnerBox>
            <Label>{"팁"}</Label>
            <Text>{data?.stepTip}</Text>
          </InnerBox>
        </HLongBox>
      </LongBox>
    </Frame>
  );
}

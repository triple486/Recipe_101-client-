import { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/reducers";
import { setRecipe, setStepImage } from "../../redux/addrecipeReducer";

const Modal = styled.div`
  height: 100vh;
  width: 100vw;
  z-index: 2;
  top: 0;
  left: 0;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InputArea = styled.div`
  height: 300px;
  width: 800px;
  position: fixed;
  display: flex;
  z-index: 2;
  flex-direction: row;
  background: white;
`;
const Inputline = styled.div`
  flex: 1 0 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const TextArea = styled.textarea`
  flex: 4 0 0;
  height: 80%;
  width: 80%;
  resize: none;
`;

const TextLabelBox = styled.div`
  flex: 1 0 0;
  height: 80%;
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const TextLabel = styled.label``;

const Buttonline = styled.div`
  flex: 1 0 0;
  display: flex;
  flex-direction: row;
`;

const InputButton = styled.button`
  flex: 1 0 0;
`;

const Frame = styled.div`
  flex: 1 0 0;
  display: flex;
  flex-direction: column;
`;
const ImgBox2 = styled.div`
  height: 300px;
  width: 300px;
`;

const StepImage = styled.img`
  max-height: 100%;
  max-width: 100%;
  display: flex;
`;
const BoxBox = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ImgBox = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 1px red;
`;
const ImgInput = styled.input`
  height: 1px;
  width: 1px;
  margin: -1;
  overflow: hidden;
`;
const ImgLabel = styled.label`
  display: inline-box;
  height: 50px;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border: solid 1px black;
`;
const InnerBox = styled.div`
  display: flex;
  font-size: 24px;
`;

function StepImageUpload({ func }: { func: any }) {
  return (
    <ImgBox>
      <ImgLabel htmlFor={"ImgButton"}>
        <InnerBox>{"업로드"}</InnerBox>
      </ImgLabel>
      <ImgInput
        type={"file"}
        onChange={(e) => {
          func(e.target.files);
        }}
        id={"ImgButton"}
      ></ImgInput>
    </ImgBox>
  );
}

function Textfield({
  label,
  func = () => {},
}: {
  label?: string;
  func?: Function;
}) {
  return (
    <Inputline>
      <TextLabelBox>
        <TextLabel>{label}</TextLabel>
      </TextLabelBox>
      <TextArea
        onBlur={(e) => {
          func(e.target.value);
        }}
      />
    </Inputline>
  );
}

export default function ItemInput({ func }: { func: Function }) {
  let dispatch = useDispatch();
  let { Recipe } = useSelector((state: RootState) => state.addrecipeReducer);
  let [data, setdata] = useState<{ cookingDc: string; stepTip: string }>({
    cookingDc: "",
    stepTip: "",
  });
  let [image, imagef] = useState<any>("");
  let imageurl = image === "" ? "" : URL.createObjectURL(image[0]);
  function inputf(type: string) {
    let sdata: any = {};
    return (v: string) => {
      sdata[type] = v;
      setdata({ ...data, ...sdata });
    };
  }
  return (
    <Modal>
      <InputArea>
        <ImgBox2>
          {imageurl === "" ? (
            <StepImageUpload func={imagef} />
          ) : (
            <BoxBox>
              <StepImage src={imageurl}></StepImage>
              <button
                onClick={() => {
                  imagef("");
                }}
              >
                취소
              </button>
            </BoxBox>
          )}
        </ImgBox2>

        <Frame>
          <Textfield label={"조리 단계 설명"} func={inputf("cookingDc")} />
          <Textfield label={"조리 단계 팁"} func={inputf("stepTip")} />
          <Buttonline>
            <InputButton
              onClick={() => {
                func(false);
              }}
            >
              취소
            </InputButton>
            <InputButton
              onClick={() => {
                dispatch(setRecipe({ cookingNo: Recipe.length, ...data }));
                dispatch(setStepImage(image));
                func(false);
              }}
            >
              추가
            </InputButton>
          </Buttonline>
        </Frame>
      </InputArea>
    </Modal>
  );
}

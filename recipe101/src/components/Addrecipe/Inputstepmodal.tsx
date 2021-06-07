import { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/reducers";
import StepImageUpload from "../ImageUpload";
import { setRecipe, setStepImage } from "../../redux/addrecipeReducer";

const Modal = styled.div`
  height: 100vh;
  width: 100vw;
  z-index: 2;
  top: 0;
  left: 0;
  position: fixed;
  display: flex;
  color: black;
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
  border: solid 2px white;
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
  background-color: white;
  border: 1px solid white;
  &:hover {
    border: solid 1px white;
    background-color: #f6eace;
  }
`;

const Frame = styled.div`
  flex: 1 0 0;
  display: flex;
  flex-direction: column;
`;
const ImgBox2 = styled.div`
  height: 295px;
  width: 295px;
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

const IMGBox3 = styled.div`
  flex: 1 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const IMGBox4 = styled.div`
  flex: 1 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export default function ItemInput({ func }: { func: Function }) {
  let dispatch = useDispatch();
  let { Recipe } = useSelector((state: RootState) => state.addrecipeReducer);
  let [data, setdata] = useState<{ cookingDc: string; stepTip: string }>({
    cookingDc: "",
    stepTip: "",
  });
  let [image, imagef] = useState<{
    file?: File;
    imgpath?: string | ArrayBuffer | null;
    isin?: boolean;
  }>({ isin: false });

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
          {image.isin ? (
            <BoxBox>
              <IMGBox4>
                <IMGBox3>
                  <StepImage
                    src={typeof image.imgpath === "string" ? image.imgpath : ""}
                  ></StepImage>
                </IMGBox3>
              </IMGBox4>
              <button
                onClick={() => {
                  imagef({ isin: false });
                }}
              >
                취소
              </button>
            </BoxBox>
          ) : (
            <StepImageUpload
              func={(files: any) => {
                imagef({
                  file: files[0],
                  imgpath: URL.createObjectURL(files[0]),
                  isin: true,
                });
              }}
            />
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
                dispatch(setRecipe({ cookingNo: Recipe.length + 1, ...data }));
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

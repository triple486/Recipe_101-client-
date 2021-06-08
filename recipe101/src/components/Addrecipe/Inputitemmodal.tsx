import { useState } from "react";
import styled from "styled-components";
import Input from "../Input";
import { useDispatch } from "react-redux";
import { setIngredient } from "../../redux/addrecipeReducer";
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

const InputBox = styled.div`
  height: 300px;
  width: 400px;
  position: fixed;
  display: flex;
  z-index: 2;
  flex-direction: column;
  background-color: #b17d55;
  border: solid 1px black;
`;
const Inputline = styled.div`
  flex: 1 0 0;
  display: flex;
  flex-direction: row;
`;

const InputButton = styled.button`
  flex: 1 0 0;
  border: 1px solid white;
  background-color: white;
  border: solid 1px black;
  &:hover {
    border: solid 1px white;
    background-color: #f6eace;
  }
`;

const TypeBox = styled.div`
  flex: 1 0 0;
  display: flex;
  align-items: center;
`;
const TBox = styled.div<{ select: boolean }>`
  flex: 1 0 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  ${({ select }) => (select ? "border: solid 1px black;" : "")}
  border-radius: 10px;
`;

const Label = styled.label`
  flex: 4 0 0;
  font-size: 20px;
  font-weight: 500;
  text-align: right;
  vertical-align: middle;
`;

const TypeBox2 = styled.div`
  flex: 9 0 0;
  display: flex;
  align-items: center;
`;

const Box = styled.span`
  flex: 1 0 0;
  display: flex;
`;
const Box2 = styled.span`
  flex: 1 0 0;
  display: flex;
  justify-content: center;
`;

export default function ItemInput({ func }: { func: Function }) {
  let dispatch = useDispatch();
  let [data, setdata] = useState<{ name: string; type: string; cap: string }>({
    name: "",
    type: "주재료",
    cap: "",
  });

  function inputf(type: string) {
    let sdata: any = {};
    return (v: string) => {
      sdata[type] = v;
      setdata({ ...data, ...sdata });
    };
  }
  return (
    <Modal>
      <InputBox>
        <TypeBox>
          <Box></Box>
          <Label>{`${"종류명"}`}</Label>
          <Box></Box>
          <TypeBox2>
            <Box2>
              <TBox
                select={data.type === "주재료"}
                onClick={() => {
                  inputf("type")("주재료");
                }}
              >
                <Box2>{"주 재료"}</Box2>
              </TBox>
            </Box2>
            <Box2>
              <TBox
                select={data.type === "부재료"}
                onClick={() => {
                  inputf("type")("부재료");
                }}
              >
                <Box2>{"부 재료"}</Box2>
              </TBox>
            </Box2>
            <Box2>
              <TBox
                select={data.type === "양념"}
                onClick={() => {
                  inputf("type")("양념");
                }}
              >
                <Box2>{"양념"}</Box2>
              </TBox>
            </Box2>
          </TypeBox2>

          <Box></Box>
        </TypeBox>
        <Input label={"재료명"} bfunc={inputf("name")}></Input>

        <Input label={"용량"} bfunc={inputf("cap")}></Input>
        <Inputline>
          <InputButton
            onClick={() => {
              func(false);
            }}
          >
            취소
          </InputButton>
          <InputButton
            onClick={() => {
              dispatch(setIngredient(data));
              func(false);
            }}
          >
            추가
          </InputButton>
        </Inputline>
      </InputBox>
    </Modal>
  );
}

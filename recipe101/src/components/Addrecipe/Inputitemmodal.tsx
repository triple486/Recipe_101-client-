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
  background-color: #f6eace;
`;
const Inputline = styled.div`
  flex: 1 0 0;
  display: flex;
  flex-direction: row;
`;

const InputButton = styled.button`
  flex: 1 0 0;
  border : 1px solid white;
  background-color: white;
  &:hover {
    border: solid 1px white;
    background-color: #f6eace
`;

export default function ItemInput({ func }: { func: Function }) {
  let dispatch = useDispatch();
  let [data, setdata] = useState<{ name: string; type: string; cap: string }>({
    name: "",
    type: "",
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
        <Input label={"재료명"} bfunc={inputf("name")}></Input>
        <Input label={"종류"} bfunc={inputf("type")}></Input>
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

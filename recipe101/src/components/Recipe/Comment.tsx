import styled from "styled-components";
import Starscore from "./Starscore";
import { useState } from "react";
const Frame = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const InnerFrame = styled.div`
  height: 90%;
  width: 90%;
  display: flex;
  flex-direction: row;
`;

const ScoreBox = styled.div<{ l: number }>`
  height: ${({ l }) => l}px;
  width: ${({ l }) => l}px;
  flex: 0 0 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const MessageBox = styled.div`
  flex: 1 0 0;

  display: flex;
  flex-direction: column;
`;
const AddButton = styled.button<{ l: number }>`
  height: ${({ l }) => l}px;
  width: ${({ l }) => l}px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LineBox = styled.div`
  flex: 1 0 0;
  width: 100%;
  display: flex;
  border: solid 1px black;
`;

const Textarea = styled.textarea`
  flex: 4 0 0;
  display: flex;
  width: 100%;
  resize: none;
`;

const TextBox = styled.div``;

export default function ({ h }: { h: number }) {
  let [y, sety] = useState(0);
  return (
    <Frame>
      <InnerFrame>
        <ScoreBox l={h * 0.9}>
          <Starscore v={y} f={sety}></Starscore>
        </ScoreBox>
        <MessageBox>
          <LineBox></LineBox>
          <Textarea></Textarea>
        </MessageBox>
        <AddButton l={h * 0.9}>
          <TextBox>{"추가"}</TextBox>
        </AddButton>
      </InnerFrame>
    </Frame>
  );
}

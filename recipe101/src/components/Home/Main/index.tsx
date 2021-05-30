import styled from "styled-components";
import Mainslide from "./Mainslide";
import Maingrid from "./Maingrid";
import Maindesc from "./Maindesc";

const Frame = styled.div`
  min-height: 100%;
  width: 100%;
  max-width: 1200px;
  flex: 1;
  position: relative;
  overflow: hidden;
  border: solid 1px red;
`;

export default function () {
  return (
    <Frame>
      <Mainslide></Mainslide>
      <Maingrid></Maingrid>
      <Maindesc></Maindesc>
      <Maindesc></Maindesc>
      <Maindesc></Maindesc>
      <Maindesc></Maindesc>
    </Frame>
  );
}

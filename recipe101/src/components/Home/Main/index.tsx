import styled from "styled-components";
import Mainslide from "./Mainslide";
import Maingrid from "./Maingrid";
import Mainintro from "./Mainintro";
//import Maindesc from "./Maindesc";

const Frame = styled.div`
  height: 100%;
  width: 100%;
  max-width: 1200px;
  flex: 1 0 0;
  border: solid 1px red;
`;

export default function () {
  return (
    <Frame>
      <Mainslide></Mainslide>
      <Maingrid></Maingrid>
      <Mainintro></Mainintro>
      {/* <Maindesc></Maindesc>
      <Maindesc></Maindesc>
      <Maindesc></Maindesc>
      <Maindesc></Maindesc> */}
    </Frame>
  );
}

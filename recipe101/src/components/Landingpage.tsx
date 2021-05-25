import { useState } from "react";
import styled from "styled-components";
import Maingrid from "./Maingrid";
import Mainslide from "./Mainslide";

const Frame = styled.div`
  flex: 1 0 0;
  border: solid 1px red;
`;

function Landingpage() {
  return (
    <Frame>
      <Mainslide></Mainslide>
      <Maingrid></Maingrid>
    </Frame>
  );
}

export default Landingpage;

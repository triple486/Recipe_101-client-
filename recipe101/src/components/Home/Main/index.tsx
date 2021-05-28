import styled from "styled-components";
import Mainslide from "./Mainslide";
import Maingrid from "./Maingrid";

const Frame = styled.div`
  min-height: 100%;
  width: 100%;
  flex: 1;
  border: solid 1px red;
`;

export default function () {
  return (
    <Frame>
      <Mainslide></Mainslide>
      <Maingrid></Maingrid>
    </Frame>
  );
}

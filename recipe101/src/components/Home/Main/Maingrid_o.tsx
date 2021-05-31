import styled from "styled-components";

const Frame = styled.div`
  height: ${() => Math.floor((window.innerHeight - 100) * 0.5)}px;
  width: 100%;
  border: solid 1px green;
`;

function Maingrid() {
  return <Frame></Frame>;
}

export default Maingrid;

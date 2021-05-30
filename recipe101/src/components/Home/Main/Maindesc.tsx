import styled from "styled-components";

const Frame = styled.div`
  height: ${() => Math.floor((window.innerHeight - 100) * 0.8)}px;
  width: 100%;
  justify-content: center;
  align-items: center;
  border: solid 1px green;
`;

function Maindesc() {
  return <Frame></Frame>;
}

export default Maindesc;

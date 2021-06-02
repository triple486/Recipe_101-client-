import styled from "styled-components";

const CancelButton = styled.button`
  height: 20px;
  width: 20px;
  display: flex;
  border-radius: 50%;
  padding: 2px;
  background-color: grey;
  border: solid 1px black;
`;

const CancelLine = styled.div`
  height: 20px;
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
`;
const dummy = () => {};
export default function Canclebutton({ Cancel = dummy }: { Cancel: Function }) {
  return (
    <CancelLine>
      <CancelButton onClick={(e) => Cancel(e)}>
        <span></span>
      </CancelButton>
    </CancelLine>
  );
}

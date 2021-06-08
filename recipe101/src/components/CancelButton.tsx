import styled from "styled-components";

const CancelButton = styled.button`
  height: 20px;
  width: 20px;
  display: flex;
  padding: 2px;
  justify-content: center;
  align-items: center;
`;

const BTBOX = styled.div`
  display: flex;
  font-size: 20px;
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
        <BTBOX>&times;</BTBOX>
      </CancelButton>
    </CancelLine>
  );
}

import styled from "styled-components";
import CancelButton from "../CancelButton";
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

const MessageBox = styled.div`
  height: 130px;
  width: 800px;
  display: flex;
  flex-direction: column;
  background: white;
  border: solid 1px white;
`;

const TextLine = styled.div`
  flex: 2 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
`;
const ButtonLine = styled.div`
  flex: 1 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0 30px;
`;
const Button = styled.button`
  width: 10%;
  height: 100%;
  min-width: 50px;
  min-height: 25px;
  background-color: #b17d55;
  border: solid 1px #dfdfdf;
  color: white;
  padding: 5px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 14px;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
  cursor: pointer;

  &:hover {
    border: solid 1px white;
    background-color: #f6eace
    opacity: 0.7;
    color: black;
`;

const dummy = () => {};

export default function Messageboxcomp({
  cancel = dummy,
  button = dummy,
  message = "",
  buttonMessage = "",
}: {
  cancel?: Function;
  button?: Function;
  message?: string;
  buttonMessage?: string;
}) {
  return (
    <Modal>
      <MessageBox>
        <CancelButton Cancel={cancel}></CancelButton>
        <TextLine>{message}</TextLine>
        <ButtonLine>
          <Button onClick={(e) => button(e)}>{buttonMessage}</Button>
        </ButtonLine>
      </MessageBox>
    </Modal>
  );
}

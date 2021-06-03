import styled from "styled-components";

const Frame = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const ButtonLine = styled.div`
  height: 30px;
  width: 100%;
  flex-direction: row-reverse;
`;
const Button = styled.div`
  height: 30px;
  width: 30px;
`;
const InfoLine = styled.div`
  flex: 1 0 0;
  display: flex;
  flex-direction: row;
`;
const MessageLine = styled.div`
  flex: 1 0 0;
  display: flex;
  flex-direction: row;
`;

const TextBox = styled.div<{ n?: number }>`
  flex: ${({ n }) => (n ? n : 1)};
`;

interface data {
  userimage: string;
  username: string;
  text: string;
  score: number;
  createdAt: string;
  updatedAt: string;
}

function Commentcard({ data }: { data: data }) {
  return (
    <Frame>
      <InfoLine>
        <TextBox></TextBox>
        <TextBox></TextBox>
        <TextBox></TextBox>
      </InfoLine>
      <MessageLine>
        <TextBox></TextBox>
        <TextBox></TextBox>
      </MessageLine>
    </Frame>
  );
}

export default Commentcard;

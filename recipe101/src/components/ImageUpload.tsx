import styled from "styled-components";

const ImgBox = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 1px red;
`;
const ImgInput = styled.input`
  height: 1px;
  width: 1px;
  margin: -1;
  overflow: hidden;
`;
const ImgLabel = styled.label`
  display: inline-box;
  height: 50px;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border: solid 1px black;
`;
const InnerBox = styled.div`
  display: flex;
  font-size: 24px;
`;

export default function ({ func }: { func: any }) {
  return (
    <ImgBox>
      <ImgLabel htmlFor={"ImgButton"}>
        <InnerBox>{"업로드"}</InnerBox>
      </ImgLabel>
      <ImgInput
        type={"file"}
        onChange={(e) => {
          func(e.target.files);
        }}
        id={"ImgButton"}
      ></ImgInput>
    </ImgBox>
  );
}

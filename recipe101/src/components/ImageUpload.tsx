import styled from "styled-components";

const ImgBox = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 1px white;
  background-color: #f6eace;
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
  opacity: 0.6;
  border: solid 1px black;
  background-color: #b17d55;
  &:hover {
    // border: solid 1px black;
    // background-color: #f6eace;
    // opacity: 0.7;
    // color: black;
    cursor: pointer;
`;

const InnerBox = styled.div`
  display: flex;
  font-size: 24px;
`;

export default function ImageUpload({
  func,
  name = "test",
}: {
  func: any;
  name?: string;
}) {
  return (
    <ImgBox>
      <ImgLabel htmlFor={name}>
        <InnerBox>{"업로드"}</InnerBox>
      </ImgLabel>
      <ImgInput
        type={"file"}
        onChange={(e) => {
          func(e.target.files);
        }}
        id={name}
      ></ImgInput>
    </ImgBox>
  );
}

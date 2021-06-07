import styled from "styled-components";

const Frame = styled.div<{ l: string }>`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ l }) => (l === "작성자" ? "cursor:pointer ;" : "")}
`;

const InnerFrame = styled.div`
  height: 100%;
  width: 90%;
  display: flex;
`;
const Label = styled.div<{ s?: number; w?: number }>`
  flex: 3 0 0;
  ${({ s }) => (s ? `font-size: ${s}px;` : null)}
  ${({ w }) => (w ? `font-weight: ${w};` : null)}
`;
const Label1 = styled.div<{ s?: number; w?: number }>`
  flex: 1 0 0;
  ${({ s }) => (s ? `font-size: ${s}px;` : null)}
  ${({ w }) => (w ? `font-weight: ${w};` : null)}
`;
const Text = styled.div<{ s?: number; w?: number; l: string }>`
  flex: 6 0 0;
  ${({ l }) => (l === "작성자" ? "curser: default ;" : "")}
  ${({ s }) => (s ? `font-size: ${s}px;` : null)}
  ${({ w }) => (w ? `font-weight: ${w};` : null)}
`;

export default function LabelBox({
  l,
  v,
  s,
  w,
  func,
}: {
  l: string;
  v: string;
  s?: number;
  w?: number;
  func?: Function;
}) {
  return (
    <Frame
      l={l}
      title={
        l === "작성자"
          ? "로그인한 유저는 작성자 이름을 클릭하여 해당 유저를 구독 할수 있습니다."
          : undefined
      }
    >
      <InnerFrame>
        <Label s={s} w={w}>
          {l}
        </Label>
        <Label1 s={s} w={w}>
          {":"}
        </Label1>
        <Text
          l={l}
          s={s}
          w={w}
          onClick={() => {
            if (func !== undefined) {
              func();
            }
          }}
        >
          {v}
        </Text>
      </InnerFrame>
    </Frame>
  );
}

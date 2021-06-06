import styled from "styled-components";

const Frame = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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
const Text = styled.div<{ s?: number; w?: number }>`
  flex: 6 0 0;
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
    <Frame>
      <InnerFrame>
        <Label s={s} w={w}>
          {l}
        </Label>
        <Label1 s={s} w={w}>
          {":"}
        </Label1>
        <Text
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

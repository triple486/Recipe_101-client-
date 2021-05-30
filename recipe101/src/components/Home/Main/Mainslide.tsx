import { useState } from "react";
import styled, { keyframes } from "styled-components";

const slide = keyframes`
0% {
  margin-left:0;
}
100% {
  margin-left:0;
} 
`;

const Frame = styled.div`
  height: ${Math.floor((window.innerHeight - 100) * 0.3)}px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  border: solid 1px green;
`;
const Innerframe = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  border: solid 1px red;
`;

const DataArea = styled.div`
  flex: 16 0 0;
  animation: ${slide} 4s infinite linear normal;
  border: solid 1px red;
`;
const SelectArea = styled.div`
  flex: 2 0 0;
  display: flex;
  felx-direction: row;
  justify-content: space-evenly;
  align-items: center;
  border: solid 1px red;
`;

const SelectBox = styled.button<{ isOn: boolean }>`
  height: 50%;
  width: 5%;
  border-radius: 10px;
  border: solid 1px red;
  ${(props) => props.isOn && `background :green; `}

  &:hover {
    background: yellow;
  }
`;
function Mainslide() {
  let dummydata = [1, 2, 3, 4, 5];
  let [next, setnext] = useState(1);
  let [data, setdata] = useState(dummydata[0]);

  return (
    <Frame>
      <Innerframe>
        <DataArea
          onAnimationIteration={(e) => {
            let n = next + 1 < dummydata.length ? next + 1 : 0;
            setdata(dummydata[next]);
            setnext(n);
          }}
        >
          {data}
        </DataArea>
        <SelectArea>
          {dummydata.map((x, i) => {
            return (
              <SelectBox
                key={i}
                isOn={i === (next > 0 ? next - 1 : 4)}
                onClick={() => {
                  setdata(x);
                  setnext(i + 1 < dummydata.length ? i + 1 : 0);
                }}
              ></SelectBox>
            );
          })}
        </SelectArea>
      </Innerframe>
    </Frame>
  );
}

export default Mainslide;

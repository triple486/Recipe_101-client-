import axios from "axios";
import { useState } from "react";
import styled, { keyframes } from "styled-components";
import Recipeslide from "./Recipeslide";
const slide = keyframes`
0% {
  margin-left:0;
}
100% {
  margin-left:0;
} 
`;

const Frame = styled.div`
  height: ${Math.floor((window.innerHeight - 100) * 0.6)}px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;
const Innerframe = styled.div`
  height: 80%;
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
  justify-content: center;
  align-items: center;
  border: solid 1px red;
`;

const SelectBox = styled.button<{ isOn: boolean }>`
  height: 50%;
  width: 2%;
  margin: 10px;
  border-radius: 50%;
  border: solid 1px red;
  ${(props) => props.isOn && `background :green; `}

  &:hover {
    background: yellow;
  }
`;
interface recipe {
  food_id?: number;
  food_name?: string;
  food_img?: string;
  level?: string;
  cooking_time?: string;
  summary?: string;
  count?: number | null;
}

function Mainslide() {
  let [Recipes, setRecipes] = useState<recipe[]>([]);
  let [next, setnext] = useState(1);
  let [data, setdata] = useState<recipe>();
  let url = `${process.env.REACT_APP_SERVER_URL}/recommend/10`;
  if (!Recipes.length) {
    axios.get(url).then((rst) => {
      console.log(rst);
      setRecipes(rst.data.data.recipe);
      setdata(rst.data.data.recipe[0]);
      setnext(1);
    });
  }

  return (
    <Frame>
      <Innerframe>
        <DataArea
          onClick={() => {}}
          onAnimationIteration={(e) => {
            let n = next + 1 < Recipes.length ? next + 1 : 0;
            setdata(Recipes[next]);
            setnext(n);
          }}
        >
          <Recipeslide data={data || {}}></Recipeslide>
        </DataArea>
        <SelectArea>
          {Recipes.map((x, i) => {
            return (
              <SelectBox
                key={i}
                isOn={i === (next > 0 ? next - 1 : Recipes.length - 1)}
                onClick={() => {
                  setdata(x);
                  setnext(i + 1 < Recipes.length ? i + 1 : 0);
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

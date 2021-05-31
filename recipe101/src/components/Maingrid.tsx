import React from 'react';
import axios from "axios";
import styled from "styled-components";
import Recipegrid from "./Recipegrid";

const Frame = styled.div`
  // height: 100%;
  // width: 100%;
  display: flex;
  flex-direction: column;
  border: solid 1px green;
`;

const Line = styled.div`
  display: flex;
  flex: 1 0 0;
  flex-direction: row;
  margin: 0 auto;
`;

const Body = styled.div`
  
  width: 100%;
  display: flex;
  flex-direction: column;
`;

function Maingrid() {
  let [recipes, setRecipes] = React.useState([]);
  let [loaded, setLoaded] = React.useState(false);

  let url = `${process.env.REACT_APP_SERVER_URL}/recent/12`;
  
  if(!loaded){
    axios
    .get(url)
    .then((rst) => {
      console.log(rst);
      setRecipes(rst.data.data.recipe);
      setLoaded(true);
    })
  }

  let data1 = recipes.slice(0, 4),
    data2 = recipes.slice(4, 8),
    data3 = recipes.slice(8, 12);

  return (
    <Frame>
      <Body>
        <Line>
          {data1.map((x, i) => {
            return (
              // Recipecard 컴포넌트와 같은 형식으로 새로 만들어서 불러준다
              <Recipegrid
                key={i}
                data={x}
              ></Recipegrid>
            );
          })}
        </Line>
        <Line>
          {data2.map((x, i) => {
            return (
              <Recipegrid
                key={i}
                data={x}
              ></Recipegrid>
            );
          })}
        </Line>
        <Line>
          {data3.map((x, i) => {
            return (
              <Recipegrid
                key={i}
                data={x}
              ></Recipegrid>
            );
          })}
        </Line>
      </Body>
    </Frame>
  );
}

export default Maingrid;

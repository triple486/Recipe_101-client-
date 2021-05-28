import styled from "styled-components";
import Recipecard from "./Recipecard";
import {
  Route,
  Switch,
  useHistory,
  useLocation,
  Link,
  Redirect,
  useParams,
  useRouteMatch,
} from "react-router-dom";
const Frame = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Line = styled.div`
  display: flex;
  flex: 1 0 0;
  flex-direction: row;
`;

const Body = styled.div<{ height: number }>`
  height: ${(props) => props.height}px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export default function ({
  data,
  width,
  height,
  num,
}: {
  data: any[];
  width: number;
  height: number;
  num: number;
}) {
  let data1 = data.slice(0, 4),
    data2 = data.slice(4, 8),
    data3 = data.slice(8, 12);

  return (
    <Frame>
      <Body height={height}>
        <Line>
          {data1.map((x, i) => {
            return (
              <Recipecard
                key={i}
                data={x}
                width={width}
                height={height}
              ></Recipecard>
            );
          })}
        </Line>
        <Line>
          {data2.map((x, i) => {
            return (
              <Recipecard
                key={i}
                data={x}
                width={width}
                height={height}
              ></Recipecard>
            );
          })}
        </Line>
        <Line>
          {data3.map((x, i) => {
            return (
              <Recipecard
                key={i}
                data={x}
                width={width}
                height={height}
              ></Recipecard>
            );
          })}
        </Line>
      </Body>
    </Frame>
  );
}

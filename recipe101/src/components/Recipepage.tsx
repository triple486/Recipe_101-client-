import styled from "styled-components";
import Recipecard from "./Recipecard";
import { useSelector } from "react-redux";
import { RootState } from "../redux/reducers";
import { useParams } from "react-router-dom";
const Frame = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const BoxFrame = styled.div`
  height: 33%;
  width: 25%;
  display: flex;
`;

export default function ({ width, height }: { width: number; height: number }) {
  let { id } = useParams<{ id?: string }>();
  let nid = Number(id) - 1;
  let { search } = useSelector((state: RootState) => state.searchReducer);
  let data = search.slice(nid * 12, (nid + 1) * 12);

  return (
    <Frame>
      {data.map((x, i) => {
        return (
          <BoxFrame>
            <Recipecard key={i} data={x}></Recipecard>
          </BoxFrame>
        );
      })}
    </Frame>
  );
}

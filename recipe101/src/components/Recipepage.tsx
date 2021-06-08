import styled from "styled-components";
import Recipecard from "./Recipecard";
import { useSelector } from "react-redux";
import { RootState } from "../redux/reducers";
import { useParams } from "react-router-dom";
const Frame = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export default function Recipepage({ func = () => {} }: { func?: Function }) {
  let { id } = useParams<{ id?: string }>();
  console.log(id);
  func(Number(id));
  let nid = Number(id) - 1;
  let { search } = useSelector((state: RootState) => state.searchReducer);
  let data = search.slice(nid * 12, (nid + 1) * 12);
  return (
    <Frame>
      {data.map((x, i) => {
        return <Recipecard key={i} data={x}></Recipecard>;
      })}
    </Frame>
  );
}

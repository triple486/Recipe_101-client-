import Recipecard from "./Recipecard";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../redux/reducers";

const Frame = styled.div`
  flex: 1 0 0;
  border: solid 1px blue;
`;

function Searchresult() {
  let data = useSelector((state: RootState) => state.searchReducer);

  return (
    <Frame>
      {data.isFail
        ? "잘못된 검색을 시행하였습니다."
        : data.search.length
        ? `${data.search}`
        : "검색된 결과가 없습니다."}
    </Frame>
  );
}

export default Searchresult;

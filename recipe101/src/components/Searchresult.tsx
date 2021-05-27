import Recipecard from "./Recipecard";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../redux/reducers";

const Frame = styled.div`
  flex: 1 0 0;
  border: solid 1px blue;
  display: flex;
  flex-direction: column;
`;
const Box = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex: 1 0 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const TextBox = styled.div`
  display: flex;
  font-size: 30px;
  font-weight: 600;
`;

function Result({ isFail, search }: { isFail: boolean; search: Object[] }) {
  if (isFail) {
    return (
      <Box>
        <TextBox>{"검색어를 입력 해 주세요."}</TextBox>
      </Box>
    );
  } else if (search.length) {
    return (
      <div>
        {search.map((x, i) => {
          return <Recipecard key={i} data={x}></Recipecard>;
        })}
      </div>
    );
  } else {
    return (
      <Box>
        <TextBox>{"검색된 결과가 없습니다."}</TextBox>
      </Box>
    );
  }
}

function Searchresult() {
  let data = useSelector((state: RootState) => state.searchReducer);

  return (
    <Frame>
      <Result isFail={data.isFail} search={data.search}></Result>
    </Frame>
  );
}

export default Searchresult;

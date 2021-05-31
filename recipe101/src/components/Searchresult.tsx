import Recipepage from "./Recipepage";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../redux/reducers";
import { useState } from "react";
import {
  Route,
  Switch,
  useHistory,
  useLocation,
  Link,
  Redirect,
  useRouteMatch,
} from "react-router-dom";
const Frame = styled.div`
  flex: 1 0 0;
  border: solid 1px blue;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow-y: scroll;
`;
const Box = styled.div`
  height: 100%;
  max-width: 1200px;
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

function FailResult() {
  return (
    <Box>
      <TextBox>{"검색어를 입력 해 주세요."}</TextBox>
    </Box>
  );
}

function Result({ search }: { search: any[] }) {
  return (
    <>
      {search.length ? (
        <YesResult search={search}></YesResult>
      ) : (
        <NoResult></NoResult>
      )}
    </>
  );
}

const Box2 = styled.div`
  height: 100%;
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1 0 0;
`;
const ResultWindow = styled.div`
  flex: 1 0 0;
`;
const Header = styled.div`
  height: 50px;
  width: 100%;
`;
const Selecter = styled.select`
  width: 50px;
`;

function YesResult({ search }: { search: any[] }) {
  let width = window.innerWidth > 1300 ? 1300 : window.innerWidth;
  let height = window.innerHeight - 100;

  let w = Math.floor(width / 400) * 100;
  let h = Math.floor(height / 150) * 50;
  let k = Math.ceil(search.length / 12);
  let pn = [];
  for (let i = 0; i < k; i++) {
    pn.push(i + 1);
  }
  let [dataset, datasetf] = useState(search.slice(0, 12));
  let [num, numf] = useState(1);
  function change(i: number) {
    numf(i + 1);
    datasetf(search.slice(i * 12, (i + 1) * 12));
  }

  return (
    <Box2>
      <Header>
        <Selecter onChange={(e) => change(e.target.selectedIndex)}>
          {pn.map((x: number) => {
            return <option key={x}>{x}</option>;
          })}
        </Selecter>
      </Header>
      <Recipepage data={dataset} width={w} height={h} num={num}></Recipepage>
    </Box2>
  );
}

function NoResult() {
  return (
    <Box>
      <TextBox>{"검색된 결과가 없습니다."}</TextBox>
    </Box>
  );
}

function Searchresult() {
  let data = useSelector((state: RootState) => state.searchReducer);

  return (
    <Frame>
      {data.isFail ? (
        <FailResult></FailResult>
      ) : (
        <Result search={data.search}></Result>
      )}
    </Frame>
  );
}

export default Searchresult;

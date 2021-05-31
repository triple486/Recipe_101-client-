import Recipepage from "../Recipepage";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import {
  Route,
  Switch,
  useHistory,
  Redirect,
  useRouteMatch,
  Link,
} from "react-router-dom";
import { useState } from "react";
const Frame = styled.div`
  flex: 1 0 0;
  width: 100%;
  border: solid 1px blue;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  return <>{search.length ? <YesResult></YesResult> : <NoResult></NoResult>}</>;
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
const Footer = styled.div`
  height: 100px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FooterBox = styled.div`
  height: 50px;
  width: 30%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
const Selecter = styled.select`
  width: 50px;
`;

const InnerBox = styled.div`
  display: flex;
`;

function YesResult() {
  let width = window.innerWidth > 1300 ? 1300 : window.innerWidth;
  let height = window.innerHeight - 200;
  let { search } = useSelector((state: RootState) => state.searchReducer);
  let [q, setq] = useState(1);
  let history = useHistory();
  let w = Math.floor(width / 400) * 100;
  let h = Math.floor(height / 150) * 50;
  let k = Math.ceil(search.length / 12);
  let pn: number[] = [];
  for (let i = 0; i < 10 * Math.ceil(k / 10); i++) {
    pn.push(i + 1);
  }

  let match = useRouteMatch();
  const Linkbox = function ({
    num,
    func = () => {},
  }: {
    num: number | string;
    func?: Function;
  }) {
    return (
      <InnerBox onClick={() => func()}>
        <Link to={`${match.path}/${num}`}>{num}</Link>
      </InnerBox>
    );
  };

  return (
    <Box2>
      {/* <Header>
        <Selecter
          onChange={(e) =>
            history.push(`${match.path}/${e.target.selectedIndex + 1}`)
          }
        >
          {pn.map((x: number) => {
            return <option key={x}>{x}</option>;
          })}
        </Selecter>
      </Header> */}
      <Switch>
        <Route path={`${match.path}/:id`}>
          <Recipepage></Recipepage>
        </Route>
        <Route path={`${match.path}`}>
          <Redirect to={`${match.path}/${1}`} />
        </Route>
      </Switch>
      <Footer>
        <FooterBox>
          {pn.length > 10
            ? pn.slice(q - 1, q + 9).map((x, i) => {
                return (
                  <Linkbox
                    key={i}
                    num={x > k ? "" : x}
                    func={() => {
                      if (x > q) {
                        setq(x);
                      } else if (q - 9 > 0) {
                        setq(q - 9);
                      } else {
                        setq(1);
                      }
                    }}
                  ></Linkbox>
                );
              })
            : pn.map((x, i) => {
                return <Linkbox key={i} num={x > k ? "" : x}></Linkbox>;
              })}
        </FooterBox>
      </Footer>
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

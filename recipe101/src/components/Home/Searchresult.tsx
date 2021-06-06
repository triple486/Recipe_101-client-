import Recipepage from "../Recipepage";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import { Route, Switch, Redirect, useRouteMatch, Link } from "react-router-dom";
import { searchRecipe } from "../../redux/searchReducer";
import { useState } from "react";
const Frame = styled.div`
  flex: 1 0 0;
  width: 100%;
  // border: solid 1px blue;
  // display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  overflow-y: scroll;
`;
const InnerFrame = styled.div`
  flex: 1 0 0;
  width: 100%;
  // border: solid 1px blue;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Box = styled.div`
  height: 100%;
  max-width: 1500px;
  width: 100%;
  display: flex;
  flex: 1 0 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
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
  max-width: 1500px;
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1 0 0;
  margin: 20px auto 10px;
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

const InnerBox = styled.div`
  display: flex;
`;
const SortBox = styled.div`
  height: 20px;
  width: 100%;
  display: flex; ;
`;

function YesResult() {
  let dispatch = useDispatch();
  let { search } = useSelector((state: RootState) => state.searchReducer);
  let [q, setq] = useState(1);
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
      {/* <SortBox>
        <select
          onChange={(e) => {
            let n = e.target.selectedIndex;
            if (n === 0) {
              let nsearch = search.sort((a, b) => {
                return a.food_name.toUpperCase() <= b.food_name.toUpperCase()
                  ? -1
                  : 1;
              });
              dispatch(searchRecipe(nsearch));
            } else if (n === 1) {
              let nsearch = search.sort((a, b) => {
                let at = new Date(a.createdAt),
                  bt = new Date(b.createdAt);
                return at <= bt ? -1 : 1;
              });
              dispatch(searchRecipe(nsearch));
            } else {
            }
          }}
        >
          <option>이름순</option>
          <option>시간순</option>
          <option>평점순</option>
        </select>
      </SortBox> */}
      <InnerFrame>
        <Switch>
          <Route path={`${match.path}/:id`}>
            <Recipepage></Recipepage>
          </Route>
          <Route path={`${match.path}`}>
            <Redirect to={`${match.path}/${1}`} />
          </Route>
        </Switch>
      </InnerFrame>

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

import Recipepage from "../Recipepage";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import {
  Route,
  Switch,
  Redirect,
  useRouteMatch,
  Link,
  useHistory,
} from "react-router-dom";
import { useState } from "react";
const Frame = styled.div`
  flex: 1 0 0;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  overflow-y: scroll;
`;
const InnerFrame = styled.div`
  flex: 1 0 0;
  width: 100%;
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
  margin: 20px auto 30px;
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

const FbuttonBox = styled.div`
  height: 30px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const InnerBox = styled.div`
  display: flex;
  color: white;
  &:hover {
    cursor: pointer;
  }
`;
const InnerBox2 = styled.div`
  display: flex;
  color: white;
  &:hover {
    cursor: pointer;
  }
  font-weight: 700;
`;

const Slink = styled(Link)<{ iscolor: boolean }>`
  text-decoration: ${({ iscolor }) => (iscolor ? "underline" : "none")};
  font-weight: ${({ iscolor }) => (iscolor ? "700" : "400")};
  color: white;
`;
function YesResult() {
  let [id, setid] = useState<number>(1);
  let history = useHistory();
  let { search } = useSelector((state: RootState) => state.searchReducer);
  let [q, setq] = useState(1);
  let k = Math.ceil(search.length / 12);
  let pn: number[] = [];
  for (let i = 0; i < 10 * Math.ceil(k / 10); i++) {
    pn.push(i + 1);
  }

  let match = useRouteMatch();

  const Linkbox = function ({ num }: { num: number }) {
    let p = id === num;
    return num > 0 ? (
      <InnerBox>
        <Slink to={`${match.path}/${num}`} iscolor={p}>
          {num}
        </Slink>
      </InnerBox>
    ) : null;
  };
  const LinkButton = function ({ num, back }: { num: number; back: boolean }) {
    return (
      <FbuttonBox
        onClick={() => {
          if (back) {
            setq(num - 10 > 0 ? num - 10 : 1);
            history.push(`${match.path}/${num - 10 > 0 ? num - 10 : 1}`);
          } else {
            setq(num + 10 < k ? num + 10 : num);

            history.push(`${match.path}/${num + 10 < k ? num + 10 : num}`);
          }
        }}
      >
        {back ? <InnerBox2>이전</InnerBox2> : <InnerBox2>다음</InnerBox2>}
      </FbuttonBox>
    );
  };
  return (
    <Box2>
      <InnerFrame>
        <Switch>
          <Route path={`${match.path}/:id`}>
            <Recipepage func={setid}></Recipepage>
          </Route>
          <Route path={`${match.path}`}>
            <Redirect to={`${match.path}/${1}`} />
          </Route>
        </Switch>
      </InnerFrame>

      <Footer>
        <LinkButton key={-1} num={q} back={true}></LinkButton>
        <FooterBox>
          {pn.slice(q - 1, q + 9).map((x, i) => {
            return <Linkbox key={i} num={x > k ? 0 : x}></Linkbox>;
          })}
        </FooterBox>
        <LinkButton key={11} num={q} back={false}></LinkButton>
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

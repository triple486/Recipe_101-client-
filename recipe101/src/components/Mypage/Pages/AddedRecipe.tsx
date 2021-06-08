import styled from "styled-components";
import { RootState } from "../../../redux/reducers";
import { searchRecipe } from "../../../redux/searchReducer";
import { useSelector, useDispatch } from "react-redux";
import {
  Link,
  useRouteMatch,
  Switch,
  Route,
  Redirect,
  useHistory,
} from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Recipepage from "../../Recipepage";
axios.defaults.withCredentials = true;

const Frame = styled.div`
  min-height: ${window.innerHeight - 100}px;
  width: 1500px;
  display: flex;
  padding-top: 20px;
  padding-bottom: 20px;
  flex-direction: column;
`;
const InnerFrame = styled.div`
  width: 100%;
  max-width: 1500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: solid 3px white;
`;
const InnerFrame2 = styled.div`
  flex: 1 0 0;
  width: 100%;
  max-width: 1500px;
  display: flex;
  flex-direction: column;
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

const TextLine = styled.div`
  height: 50px;
  flex: 1 0 1;
  width: 1200px;
  display: flex;
`;
const TextBox = styled.div`
  margin-left: 20px;
  height: 50px;
  display: flex;
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 10px;
`;

interface recipe {
  id: number;
  foodName: string;
  imgUrl: string;
  level: string;
  cookingTime: string;
}
const FbuttonBox = styled.div`
  height: 30px;
  width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Footer = styled.div`
  height: 100px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const TextOuterBox = styled.div`
  flex: 1 0 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  display: flex; ;
`;
const Slink = styled(Link)<{ iscolor: boolean }>`
  text-decoration: none;
  color: ${({ iscolor }) => (iscolor ? "red" : "white")};
`;
export default function Profile() {
  const dispatch = useDispatch();
  let history = useHistory();
  let user = useSelector((state: RootState) => state.userReducer);
  let accessToken = useSelector((state: RootState) => state.tokenReducer);
  let [data, setdata] = useState<recipe[]>();

  let [id, setid] = useState<number>(1);
  let [q, setq] = useState(1);
  let match = useRouteMatch();
  let [k, setk] = useState(1);

  useEffect(() => {
    const config = {
      headers: {
        authorization: "bearer " + accessToken,
      },
    };
    axios
      .get(
        process.env.REACT_APP_SERVER_URL +
          `/search/username/${user.userInfo.userName}`,
        config
      )
      .then((rst) => {
        dispatch(searchRecipe([...rst.data.data.recipe]));
        setdata([...rst.data.data.recipe]);
        setk(Math.ceil(rst.data.data.recipe.length / 12));
      });
    return;
  }, [accessToken, dispatch, user]);
  let pn: number[] = [];
  for (let i = 0; i < 10 * Math.ceil(k / 10); i++) {
    pn.push(i + 1);
  }
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
        {back ? <InnerBox>이전</InnerBox> : <InnerBox>이후</InnerBox>}
      </FbuttonBox>
    );
  };
  return (
    <Frame>
      <TextLine>
        <TextBox>작성한 레시피들</TextBox>
      </TextLine>

      {data && data.length ? (
        <InnerFrame>
          <InnerFrame2>
            <Switch>
              <Route path={`${match.path}/:id`}>
                <Recipepage func={setid}></Recipepage>
              </Route>
              <Route path={`${match.path}`}>
                <Redirect to={`${match.path}/${1}`} />
              </Route>
            </Switch>
          </InnerFrame2>

          <Footer>
            <LinkButton key={-1} num={q} back={true}></LinkButton>
            <FooterBox>
              {pn.slice(q - 1, q + 9).map((x, i) => {
                return <Linkbox key={i} num={x > k ? 0 : x}></Linkbox>;
              })}
            </FooterBox>
            <LinkButton key={11} num={q} back={false}></LinkButton>
          </Footer>
        </InnerFrame>
      ) : (
        <TextOuterBox>
          <TextBox>{`새로운 레시피를 작성해보세요.`}</TextBox>
        </TextOuterBox>
      )}
    </Frame>
  );
}

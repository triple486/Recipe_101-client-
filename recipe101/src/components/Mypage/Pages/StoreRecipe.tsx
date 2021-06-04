import styled from "styled-components";
import { RootState } from "../../../redux/reducers";
import { searchRecipe } from "../../../redux/searchReducer";
import { useSelector, useDispatch } from "react-redux";
import { Link, useRouteMatch, Switch, Route, Redirect } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Recipepage from "../../Recipepage";
axios.defaults.withCredentials = true;

const Frame = styled.div`
  height: ${window.innerHeight - 100}px;
  width: 100%;
  display: flex;
  padding-top: 20px;
  padding-bottom: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const InnerFrame = styled.div`
  height: 100%;
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: solid 3px white;
`;
const InnerFrame2 = styled.div`
  flex: 1 0 0;
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
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

const TextLine = styled.div`
  height: 50px;
  width: 1200px;
  display: flex;
`;
const TextBox = styled.div`
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

export default function Profile() {
  const dispatch = useDispatch();
  let accessToken = useSelector((state: RootState) => state.tokenReducer);
  let [data, setdata] = useState<recipe[]>();
  const config = {
    headers: {
      authorization: "bearer " + accessToken,
    },
  };
  let [q, setq] = useState(1);
  let match = useRouteMatch();
  let [k, setk] = useState(1);
  if (!data) {
    axios
      .get(process.env.REACT_APP_SERVER_URL + `/store`, config)
      .then((rst) => {
        dispatch(searchRecipe([...rst.data.data]));
        setdata([...rst.data.data]);
        setk(Math.ceil(rst.data.data.length / 12));
      });
  }
  let pn: number[] = [];
  for (let i = 0; i < 10 * Math.ceil(k / 10); i++) {
    pn.push(i + 1);
  }
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

  console.log(data, match.path);
  return (
    <Frame>
      <TextLine>
        <TextBox>담아온 레시피들</TextBox>
      </TextLine>
      <InnerFrame>
        <InnerFrame2>
          <Switch>
            <Route path={`${match.path}/:id`}>
              <Recipepage></Recipepage>
            </Route>
            <Route path={`${match.path}`}>
              {data && data.length ? (
                <Redirect to={`${match.path}/${1}`} />
              ) : (
                <TextBox>{`담아둔 레시피가 없습니다.`}</TextBox>
              )}
            </Route>
          </Switch>
        </InnerFrame2>

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
      </InnerFrame>
    </Frame>
  );
}

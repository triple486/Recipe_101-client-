import styled from "styled-components";
import { RootState } from "../../../redux/reducers";
import { useSelector } from "react-redux";
import axios from "axios";
import { useState } from "react";
axios.defaults.withCredentials = true;
const Frame = styled.div`
  height: ${window.innerHeight - 100}px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 30px;
  padding-bottom: 30px;
`;
const InnerFrame = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  flex-wrap: wrap;
  border: solid 3px white;
`;

const BoxFrame = styled.div`
  height: 100px;
  width: 100%;
  display: flex;
  padding: 10px;
  flex-direction: row;
  margin-top: 10px;
  justify-content: center;
  align-items: center;
`;
const BoxInnerFrame = styled.div`
  height: 100px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: solid 2px white;
`;

const Box = styled.div`
  flex: 1 0 1;
  font-size: 15px;
  padding: 20px;
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

const Button = styled.div`
background-color: #b17d55;
  border: solid 1px #dfdfdf;
  color: white;
  padding: 5px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 14px;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
  cursor: pointer;

  &:hover {
    border: solid 1px white;
    background-color: white;
    opacity: 0.7;
    color: black;

`;
interface follow {
  id: number;
  userName: string;
  follower: number;
  recipes: number;
  createdAt: string;
}

export default function Profile() {
  let user = useSelector((state: RootState) => state.userReducer);
  let accessToken = useSelector((state: RootState) => state.tokenReducer);
  let [load, setload] = useState(false);
  let [data, setdata] = useState<follow[]>([]);
  const config = {
    headers: {
      authorization: "bearer " + accessToken,
    },
  };
  if (!load) {
    axios
      .get(
        process.env.REACT_APP_SERVER_URL +
          `/subscribe/${user.userInfo.userName}`,
        config
      )
      .then((rst) => {
        setdata([...rst.data.follow]);
        setload(true);
      });
  }
  function time(x: string) {
    let t = new Date(x);
    let y = t.getFullYear(),
      m = t.getMonth() + 1,
      d = t.getDate(),
      h = t.getHours(),
      mn = t.getMinutes(),
      s = t.getSeconds();
    return `${y}년 ${m}월 ${d}일 ${h}시 ${mn}분 ${s}초`;
  }
  return (
    <Frame>
      <TextLine>
        <TextBox>구독한 유저들</TextBox>
      </TextLine>
      <InnerFrame>
        {data && data.length ? (
          data.map((x, i) => {
            return (
              <BoxFrame key={i}>
                <BoxInnerFrame>
                  <Box>{"유저네임"}</Box>
                  <Box>{x.userName}</Box>
                  <Box>{"구독자 수"}</Box>
                  <Box>{`${x.follower} 명`}</Box>
                  <Box>{"레시피 수"}</Box>
                  <Box>{`${x.recipes} 개`}</Box>
                  <Box>{"구독 날짜"}</Box>
                  <Box>{time(x.createdAt)}</Box>
                  <Button
                    onClick={() => {
                      axios
                        .delete(
                          process.env.REACT_APP_SERVER_URL +
                            `/subscribe/${x.id}`,
                          config
                        )
                        .then(() => {
                          setload(false);
                        });
                    }}
                  >
                    {"구독 취소 "}
                  </Button>
                </BoxInnerFrame>
              </BoxFrame>
            );
          })
        ) : (
          <TextBox>구독한 유저가 없습니다.</TextBox>
        )}
      </InnerFrame>
    </Frame>
  );
}

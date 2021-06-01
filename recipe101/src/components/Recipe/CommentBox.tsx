import styled from "styled-components";
import Starscore from "./Starscore";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
axios.defaults.withCredentials = true;
const Frame = styled.div`
  flex: 1 0 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const InnerFrame = styled.div`
  height: 90%;
  width: 90%;
  display: flex;
  flex-direction: row;
  border: solid 3px black;
`;

const ScoreBox = styled.div<{ l: number }>`
  height: ${({ l }) => l}px;
  width: ${({ l }) => l}px;
  flex: 0 0 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const MessageBox = styled.div`
  flex: 1 0 0;

  display: flex;
  flex-direction: column;
`;
const AddButton = styled.button<{ l: number }>`
  height: ${({ l }) => l}px;
  width: ${({ l }) => l}px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LineBox = styled.div`
  flex: 1 0 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: solid 1px black;
`;

const Textarea = styled.div`
  flex: 4 0 0;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
const Button = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
`;

const TextBox = styled.div`
  display: flex;
`;

const InfoBox = styled.div`
  flex: 1 0 1;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const TextBox2 = styled.div`
  display: flex;
  margin-left: 20px;
`;
interface Commentf {
  userName: string;
  comment: string;
  createdAt: string;
  score: number;
}
export default function ({
  h = 100,
  r = 1,
  data,
  func = () => {},
}: {
  h?: number;
  r?: number;
  data?: Commentf;
  func?: Function;
}) {
  let user = useSelector((state: RootState) => state.userReducer);
  function time(x: string) {
    let t = new Date(x);
    let y = t.getFullYear(),
      m = t.getMonth() + 1,
      d = t.getDate(),
      h = t.getHours(),
      mn = t.getMinutes(),
      s = t.getSeconds();
    console.log(y, m, d, h, mn, s);
    return `${y}년 ${m}월 ${d}일 ${h}시 ${mn}분 ${s}초`;
  }
  return (
    <Frame>
      <InnerFrame>
        <ScoreBox l={h * 0.8 - 6}>
          <Starscore r={0.8} v={data?.score || 0} fix={true}></Starscore>
        </ScoreBox>
        <MessageBox>
          <LineBox>
            <InfoBox>
              <TextBox2>{data?.userName}</TextBox2>
              <TextBox2>{time(data?.createdAt || "")}</TextBox2>
            </InfoBox>
            {user.isLogin && user.userInfo.username === data?.userName ? (
              <Button onClick={() => func()}>
                <TextBox>{"삭제"}</TextBox>
              </Button>
            ) : null}
          </LineBox>
          <Textarea>
            <TextBox>{data?.comment}</TextBox>
          </Textarea>
        </MessageBox>
      </InnerFrame>
    </Frame>
  );
}

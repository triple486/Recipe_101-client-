import styled from "styled-components";
import Starscore from "./Starscore";
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
  background-color: white;
`;

const ScoreBox = styled.div<{ l: number }>`
  height: ${({ l }) => l}px;
  width: ${({ l }) => l}px;
  flex: 0 0 1;
  display: flex;
  color: black;
  justify-content: center;
  align-items: center;
`;
const MessageBox = styled.div`
  flex: 1 0 0;

  display: flex;
  color: black;
  flex-direction: column;
`;

const LineBox = styled.div`
  flex: 1.3 0 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: solid 1px black;
  border-top: none;
  border-right: none;
`;

const Textarea = styled.div`
  flex: 4 0 0;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
const Button = styled.button`
  width: 50px;
  height: 25px;
  display: flex;
  justify-content: center;
  margin-right: 5px;
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
export default function CommentBox({
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
            {user.isLogin && user.userInfo.userName === data?.userName ? (
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

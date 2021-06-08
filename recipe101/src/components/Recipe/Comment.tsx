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
  width: 95%;
  display: flex;
  flex-direction: row;
  background-color: white;
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
  border: solid 1px black;
  border-top: none;
`;

const Textarea = styled.textarea`
  flex: 4 0 0;
  display: flex;
  width: 100%;
  resize: none;
  border-color: black;
  border-top: none;
  border-bottom: none;
  outline: none;
  padding: 15px;
`;
const Bbox = styled.div`
  height: 100%;
  width: 200px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-itmes: center;
`;
const Tbox = styled.div`
  flex: 1 0 0;
  text-align: right;
`;

const TextBox = styled.div`
  color: black;
`;

export default function Comment({
  h,
  n,
  func,
  data,
  add,
}: {
  h: number;
  n: number;
  func: Function;
  data: { id?: number };
  add: boolean;
}) {
  let [y, sety] = useState(0);
  let [text, settext] = useState("");
  let user = useSelector((state: RootState) => state.userReducer);
  let accessToken = useSelector((state: RootState) => state.tokenReducer);
  return (
    <Frame>
      <InnerFrame>
        <ScoreBox l={h * 0.9 - 6}>
          <Starscore r={0.9} v={y} f={sety}></Starscore>
        </ScoreBox>
        <MessageBox>
          <LineBox>
            <Bbox>
              <Tbox>{"현재 댓글 수"}</Tbox>
              <Tbox>{n}</Tbox>
            </Bbox>
          </LineBox>
          <Textarea
            value={text}
            onChange={(e) => {
              settext(e.target.value);
            }}
          ></Textarea>
        </MessageBox>
        <AddButton
          l={h * 0.9 - 8}
          disabled={!user.isLogin || !add}
          onClick={() => {
            let body = {
              id: data?.id,
              userName: user.userInfo.userName,
              comment: text,
              score: y,
            };
            const config = {
              headers: {
                authorization: "bearer " + accessToken,
              },
            };

            axios
              .post(process.env.REACT_APP_SERVER_URL + `/comment`, body, config)
              .then((rst) => {
                func(false);
                sety(0);
                settext("");
              })
              .catch((x) => {
                console.dir(x);
              });
          }}
        >
          <TextBox>{"추가"}</TextBox>
        </AddButton>
      </InnerFrame>
    </Frame>
  );
}

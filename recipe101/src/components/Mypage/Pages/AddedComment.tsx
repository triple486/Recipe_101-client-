import styled from "styled-components";
import { RootState } from "../../../redux/reducers";
import { useSelector } from "react-redux";
import Comment from "../../Recipe/CommentBox";
import Message from "../../Addrecipe/messagebox";
import { useState } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;
const Frame = styled.div`
  height: ${window.innerHeight - 100}px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const InnerFrame = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 30px;
  border: solid 3px Black;
`;
const BoxFrame = styled.div`
  height: 200px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const FoodName = styled.div`
  height: 50px;
  width: 300px;
  font-size: 25px;
  padding-left: 30px;
  font-weight: 500;
`;

const TextBox = styled.div`
  height: 50px;
  display: flex;
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 10px;
`;
interface comment {
  id: number;
  userName: string;
  foodName: string;
  comment: string;
  createdAt: string;
  score: number;
}

export default function Profile() {
  let user = useSelector((state: RootState) => state.userReducer);
  let accessToken = useSelector((state: RootState) => state.tokenReducer);
  const config = {
    headers: {
      authorization: "bearer " + accessToken,
    },
  };
  let [data, setdata] = useState<comment[] | undefined>(undefined);
  let [call, setcall] = useState(false);
  let [del, setdel] = useState(0);
  if (!data) {
    axios
      .get(
        process.env.REACT_APP_SERVER_URL +
          `/comment/user/${user.userInfo.username}`,
        config
      )
      .then((rst) => {
        setdata([...rst.data.data]);
      });
  }

  return (
    <Frame>
      <InnerFrame>
        {data && data.length ? (
          data.map((x, i) => {
            let ndata = { ...x };
            if (user.userInfo.username) {
              ndata = { ...ndata, userName: user.userInfo.username };
            }
            return (
              <BoxFrame key={i}>
                <FoodName>{ndata.foodName}</FoodName>
                <Comment
                  h={200}
                  data={{ ...ndata }}
                  func={(z: any) => {
                    setcall(true);
                    setdel(x.id);
                  }}
                ></Comment>
              </BoxFrame>
            );
          })
        ) : (
          <TextBox>{"작성한 코멘트가 없습니다."}</TextBox>
        )}
      </InnerFrame>
      {call ? (
        <Message
          cancel={() => {
            setcall(false);
          }}
          message={"감상평을 지우시겠습니까?"}
          button={() => {
            const config = {
              headers: {
                authorization: "bearer " + accessToken,
              },
            };

            axios
              .delete(
                process.env.REACT_APP_SERVER_URL + `/comment/${del}`,
                config
              )
              .then((rst) => {
                setcall(true);
                console.log("완료");
              })
              .catch((err) => {
                console.log("실패");
              });
          }}
          buttonMessage={"확인"}
        ></Message>
      ) : null}
    </Frame>
  );
}

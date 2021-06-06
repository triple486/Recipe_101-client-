import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import StepBox from "./StepBox";
import LabelBox from "./LabelBox";
import Comment from "./Comment";
import CommentBox from "./CommentBox";
import Message from "../Addrecipe/messagebox";
import { getdata, isLoad } from "../../redux/newReducer";

axios.defaults.withCredentials = true;
const Frame = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  padding: 0;
  margin: 0;
  overflow-y: scroll;
  justify-content: center;
  background-color: #B17D55;
`;
const InnerFrame = styled.div`
  height: 100%;
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
`;
interface Boxset {
  h?: number;
  c?: boolean;
}
const BoxFrame = styled.div<Boxset>`
  height: ${({ h }) => (h ? h : 100)}px;
  width: 100%;
  display: flex;
  flex-direction: ${({ c }) => (c ? "column" : "row")};
  border: solid 1px white;
`;

const MinBoxFrame = styled.div<Boxset>`
  min-height: ${({ h }) => (h ? h : 100)}px;
  flex: 1 0 1;
  width: 100%;
  position: releative;
  display: flex;
  flex-direction: ${({ c }) => (c ? "column" : "row")};
  border: solid 1px white;
`;

const Img = styled.img`
  height: 400px;
  width: 400px;
`;
const BasicDataBox = styled.div`
  flex: 1 0 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  border: solid 1px white;
`;

interface Lineset {
  f?: number;
  c?: boolean;
  line?: boolean;
}

const Line = styled.div<Lineset>`
  flex: ${({ f }) => (f ? f : 1)} 0 0;
  display: flex;
  flex-direction: ${({ c }) => (c ? "column" : "row")};
  justify-content: center;
  align-items: center;
  border: solid 1px white;
`;
interface Flineset {
  h?: number;
  c?: boolean;
}

const FLine = styled.div<Flineset>`
  height: ${({ h }) => (h ? h : 100)}px;
  display: flex;
  flex-direction: ${({ c }) => (c ? "column" : "row")};
  justify-content: center;
  align-items: center;
  border: solid 1px white;
`;

const ButtonLine = styled.div`
  height: 40px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row-reverse;
`;
const DateBox = styled.div`
  height: 40px;
  width: 240px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Button = styled.button`
  height: 40px;
  display: flex;

  justify-content: center;
  align-items: center;
`;

const TextBox = styled.div<{ s?: number; w?: number }>`
  display: flex;
  ${({ s }) => (s ? `font-size: ${s}px;` : null)}
  ${({ w }) => (w ? `font-weight: ${w};` : null)}
`;

const Modal = styled.div`
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const IMG = styled.img`
  max-height: 100%;
  max width : 100%;

`;
const ItemBox = styled.div`
  height: 40px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

interface Image_extend {
  isEx?: boolean;
  image?: string;
}

function Detailedrecipe() {
  let { id } = useParams<{ id?: string }>();
  let history = useHistory();
  let dispatch = useDispatch();
  let user = useSelector((state: RootState) => state.userReducer);
  let accessToken = useSelector((state: RootState) => state.tokenReducer);
  let data = useSelector((state: RootState) => state.newReducer);
  let [iex, setiex] = useState<Image_extend>({ isEx: false });
  let [call, setcall] = useState(false);
  let [call2, setcall2] = useState(false);
  let [call3, setcall3] = useState(false);
  let [add, setadd] = useState(true);
  let [del, setdel] = useState(0);
  let [store, setstore] = useState(false);
  useEffect(() => {
    if (!data.isLoad) {
      axios
        .get(process.env.REACT_APP_SERVER_URL + `/recipe/${id}`)
        .then((rst) => {
          dispatch(getdata(rst.data.data));
          dispatch(isLoad(true));

          let data = rst.data.data;
          data.Comment.forEach((x: any, i: any) => {
            if (x.userName === user.userInfo.userName) {
              setadd(false);
            }
          });
          if (user.isLogin) {
            axios
              .get(process.env.REACT_APP_SERVER_URL + "/store", {
                headers: {
                  authorization: "bearer " + accessToken,
                },
              })
              .then((rst) => {
                rst.data.data.forEach((x: any) => {
                  if (x.id === data.food_info?.id) {
                    setstore(true);
                  }
                });
              });
          }
        });
    }

    return () => {};
  }, [
    add,
    accessToken,
    data.isLoad,
    dispatch,
    id,
    user.isLogin,
    user.userInfo.userName,
  ]);
  function Eximage() {
    return (
      <Modal
        onClick={() => {
          setiex({ ...iex, isEx: false });
        }}
      >
        <IMG src={iex.image}></IMG>
      </Modal>
    );
  }

  function timecutter(x: string) {
    return x.length ? x.split("T")[0].split("-").join(" / ") : x;
  }
  return (
    <Frame>
      <InnerFrame>
        {iex.isEx ? <Eximage></Eximage> : null}
        {/* <NaviBar></NaviBar> */}
        <ButtonLine>
          <Button
            onClick={() => {
              setadd(true);
              history.goBack();
            }}
          >
            <TextBox>{"돌아가기"}</TextBox>
          </Button>
          {user.isLogin ? (
            store ? (
              <Button
                onClick={() => {
                  axios
                    .delete(
                      process.env.REACT_APP_SERVER_URL +
                        `/store/${data.food_info?.id}`,
                      {
                        headers: {
                          authorization: "bearer " + accessToken,
                        },
                      }
                    )
                    .then((rst) => {
                      setstore(false);
                    });
                }}
              >
                <TextBox>{"구독 취소"}</TextBox>
              </Button>
            ) : (
              <Button
                onClick={() => {
                  axios
                    .post(
                      process.env.REACT_APP_SERVER_URL + "/store",
                      { id: data.food_info?.id },
                      {
                        headers: {
                          authorization: "bearer " + accessToken,
                        },
                      }
                    )
                    .then((rst) => {
                      setstore(true);
                    });
                }}
              >
                <TextBox>{"구독 하기"}</TextBox>
              </Button>
            )
          ) : null}

          {user.userInfo.userName === data.food_info?.userName ? (
            <Button
              onClick={() => {
                axios
                  .delete(
                    process.env.REACT_APP_SERVER_URL +
                      `/recipe/${data.food_info?.id}`,

                    {
                      headers: {
                        authorization: "bearer " + accessToken,
                      },
                    }
                  )
                  .then((rst) => {
                    setcall2(true);
                  });
              }}
            >
              <TextBox>{"삭제하기"}</TextBox>
            </Button>
          ) : null}

          <DateBox>
            <LabelBox
              l={"작성 일자"}
              v={timecutter(data.food_info?.createdAt || "")}
              s={1}
            ></LabelBox>
            <LabelBox
              l={"수정 일자"}
              v={timecutter(data.food_info?.updatedAt || "")}
              s={1}
            ></LabelBox>
          </DateBox>
        </ButtonLine>
        <BoxFrame h={400}>
          <Img src={data.food_info?.imgUrl}></Img>
          <BasicDataBox>
            <Line>
              <TextBox s={40} w={700}>
                {data.food_info?.foodName}
              </TextBox>
            </Line>

            <Line>
              <Line>
                <LabelBox
                  l={"작성자"}
                  v={data.food_info?.userName || ""}
                  func={() => {
                    if (user.userInfo.userName !== data.food_info?.userName) {
                      axios
                        .get(
                          process.env.REACT_APP_SERVER_URL +
                            `/subscribe/${data.food_info?.id}`,

                          {
                            headers: {
                              authorization: "bearer " + accessToken,
                            },
                          }
                        )
                        .then((rst) => {
                          console.log(rst);
                        });
                      setcall3(true);
                    }
                  }}
                ></LabelBox>
              </Line>
              <Line>
                <LabelBox
                  l={"요리 국적"}
                  v={data.food_info?.nation || ""}
                ></LabelBox>
              </Line>
            </Line>
            <Line>
              <Line>
                <LabelBox l={"분류"} v={data.food_info?.type || ""}></LabelBox>
              </Line>
              <Line>
                <LabelBox l={"분량"} v={data.food_info?.qnt || ""}></LabelBox>
              </Line>
            </Line>
            <Line>
              <Line>
                <LabelBox
                  l={"난이도"}
                  v={data.food_info?.level || ""}
                ></LabelBox>
              </Line>
              <Line>
                <LabelBox
                  l={"조리 시간"}
                  v={data.food_info?.level || ""}
                ></LabelBox>
              </Line>
            </Line>
            <Line>
              <Line>
                <LabelBox l={"저장"} v={`${data.food_info?.store}`}></LabelBox>
              </Line>
              <Line>
                <LabelBox l={"평점"} v={`${data.food_info?.score}`}></LabelBox>
              </Line>
            </Line>
          </BasicDataBox>
        </BoxFrame>
        <MinBoxFrame h={200}>
          <Line c={true}>
            <Line>
              <TextBox s={20}>{"간단한 설명"}</TextBox>
            </Line>
            <Line f={4}>
              <TextBox>{data.food_info?.summary}</TextBox>
            </Line>
          </Line>
        </MinBoxFrame>
        <MinBoxFrame h={400} c={true}>
          <BoxFrame>
            <Line>
              <TextBox s={30}>{"주 재료"}</TextBox>
            </Line>
            <Line>
              <TextBox s={30}>{"부 재료"}</TextBox>
            </Line>
            <Line>
              <TextBox s={30}>{"양념"}</TextBox>
            </Line>
          </BoxFrame>
          <MinBoxFrame h={300}>
            <Line c={true}>
              {data.Ingredients?.filter((x) => x.type === "주재료").map(
                (x, i) => {
                  return (
                    <ItemBox key={i}>
                      <TextBox>{x.name}</TextBox>
                      <TextBox>{x.cap}</TextBox>
                    </ItemBox>
                  );
                }
              )}
            </Line>
            <Line c={true}>
              {data.Ingredients?.filter((x) => x.type === "부재료").map(
                (x, i) => {
                  return (
                    <ItemBox key={i}>
                      <TextBox>{x.name}</TextBox>
                      <TextBox>{x.cap}</TextBox>
                    </ItemBox>
                  );
                }
              )}
            </Line>
            <Line c={true}>
              {data.Ingredients?.filter((x) => x.type === "양념").map(
                (x, i) => {
                  return (
                    <ItemBox key={i}>
                      <TextBox>{x.name}</TextBox>
                      <TextBox>{x.cap}</TextBox>
                    </ItemBox>
                  );
                }
              )}
            </Line>
          </MinBoxFrame>
        </MinBoxFrame>
        <MinBoxFrame h={500} c={true}>
          {data.Recipes?.map((x, i) => {
            return (
              <FLine key={i}>
                <StepBox data={x} func={setiex}></StepBox>
              </FLine>
            );
          })}
        </MinBoxFrame>
        <MinBoxFrame h={200}>
          <Comment
            n={data.Comment?.length || 0}
            h={200}
            func={setadd}
            data={{ id: data.food_info?.id }}
            add={add}
          ></Comment>
        </MinBoxFrame>
        <MinBoxFrame h={0} c={true}>
          {data.Comment?.map((x, i) => {
            return (
              <FLine h={200} key={i}>
                <CommentBox
                  h={200}
                  data={x}
                  func={(z: any) => {
                    setcall(true);
                    setdel(x.id);
                  }}
                ></CommentBox>
              </FLine>
            );
          })}
        </MinBoxFrame>
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

        {call2 ? (
          <Message
            cancel={() => {
              setcall(false);
            }}
            message={"레시피를 지우시겠습니까?"}
            button={() => {
              axios
                .delete(
                  process.env.REACT_APP_SERVER_URL +
                    `/recipe/${data.food_info?.id}`,

                  {
                    headers: {
                      authorization: "bearer " + accessToken,
                    },
                  }
                )
                .then((rst) => {
                  setcall2(false);
                  history.goBack();
                });
            }}
            buttonMessage={"확인"}
          ></Message>
        ) : null}
        {call3 ? (
          <Message
            cancel={() => {
              setcall(false);
            }}
            message={"해당 유저를 구독하겠습니까?"}
            button={() => {
              axios
                .post(
                  process.env.REACT_APP_SERVER_URL + `/subscribe`,
                  { username: data.food_info?.userName },
                  {
                    headers: {
                      authorization: "bearer " + accessToken,
                    },
                  }
                )
                .then((rst) => {
                  setcall3(false);
                });
            }}
            buttonMessage={"예"}
          ></Message>
        ) : null}
      </InnerFrame>
    </Frame>
  );
}

export default Detailedrecipe;

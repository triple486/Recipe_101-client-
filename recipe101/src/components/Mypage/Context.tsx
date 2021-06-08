import styled from "styled-components";
import { RootState } from "../../redux/reducers";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
const Frame = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ProfileImageBox = styled.div`
  flex: 1 0 0;
  display: flex;

  align-items: center;
`;

const ProfileImage = styled.img`
  height: 100%;
  width: 100%;
  flex: 1 0 0;
  padding: 5px;
  display: block;
  margin-bottom: 40px;
  margin-left: 15px;
`;
const ProfiledataBox = styled.div`
  flex: 2 0 0;
  height: 60%;
  display: flex;
  flex-direction: column;
`;

const ProfiledataLine = styled.div`
  flex: 1 0 0;
  display: flex;
  flex-direction: row;
  padding-left: 30px;
  align-items: center;
`;
const ProfiledataLine2 = styled.div`
  flex: 1 0 0;
  margin-top: 20px;
  display: flex;
  flex-direction: row-reverse;
  padding-right: 10px;
  align-items: center;
`;
const TextBox = styled.div`
  flex: 2 0 0;
  font-size: 15px;
  display: flex;
`;
const TextBox3 = styled.div`
  flex: 3 0 0;
  font-size: 15px;
  display: flex;
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
  margin: 4px 2px;

  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
  cursor: pointer;

  &:hover {
    border: solid 1px white;
    background-color: white;
    opacity: 0.7;
    color: black;
  }
`;

function ContextProfile() {
  let user = useSelector((state: RootState) => state.userReducer);
  let history = useHistory();
  return (
    <Frame>
      <ProfileImageBox>
        <ProfileImage src={user.userInfo.userImage} />
      </ProfileImageBox>
      <ProfiledataBox>
        <ProfiledataLine>
          <TextBox>{"유저 네임"}</TextBox>
          <TextBox3>{user.userInfo.userName}</TextBox3>
        </ProfiledataLine>
        <ProfiledataLine>
          <TextBox>{"이메일"}</TextBox>
          <TextBox3>{user.userInfo.email}</TextBox3>
        </ProfiledataLine>
        <ProfiledataLine>
          <TextBox>{"전화 번호"}</TextBox>
          <TextBox3>{user.userInfo.phone}</TextBox3>
        </ProfiledataLine>
        <ProfiledataLine2>
          <Button
            onClick={() => {
              history.push("/mypage/profile");
            }}
          >
            수정하기
          </Button>
        </ProfiledataLine2>
      </ProfiledataBox>
    </Frame>
  );
}

const TextBox2 = styled.div`
  font-size: 20px;
  display: flex;
  padding-right: 10px;
`;

const DummyBox = styled.div`
  height: 100%;
  width: 90%;
  padding-top: 0px;
  padding-left: 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const BBox = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
`;
const BBox2 = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

const DummyBox2 = styled.div`
  height: 100%;
  width: 200px;
  padding-top: 0px;
  padding-left: 0px;
  display: flex;
  flex-direction: row;
  justify-content: end;
`;

const Button3 = styled.div`
  background-color: #b17d55;
  border: solid 1px #dfdfdf;
  color: white;
  padding: 5px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 115px 0px 0px 0px;
  margin-left: 15px;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
  cursor: pointer;

  &:hover {
    border: solid 1px white;
    background-color: white;
    opacity: 0.7;
    color: black;
  }
`;
function ContextPassword({ func }: { func: Function }) {
  let history = useHistory();

  return (
    <Frame>
      <DummyBox2></DummyBox2>
      <Button3
        onClick={() => {
          history.push("/mypage/password");
        }}
      >
        수정하기
      </Button3>
      <Button3
        onClick={() => {
          func(true);
        }}
      >
        탈퇴하기
      </Button3>
    </Frame>
  );
}
const Button4 = styled.div`
  background-color: #b17d55;
  border: solid 1px #dfdfdf;
  color: white;
  padding: 5px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
  cursor: pointer;

  &:hover {
    border: solid 1px white;
    background-color: white;
    opacity: 0.7;
    color: black;
  }
`;
function ContextDefault({ type }: { type: string }) {
  let history = useHistory();
  let user = useSelector((state: RootState) => state.userReducer);
  return (
    <Frame>
      {type === "작성한 감상평들" ? (
        <DummyBox>
          <BBox>
            <TextBox2>{"작성한 감상평 수 :"}</TextBox2>
            <TextBox2>
              <Link to={"/mypage/addedcomment"}>{user.userInfo.comment}</Link>
              {" 개"}
            </TextBox2>
          </BBox>
          <BBox2>
            <Button4
              onClick={() => {
                history.push("/mypage/addedcomment");
              }}
            >
              이동하기
            </Button4>
          </BBox2>
        </DummyBox>
      ) : null}

      {type === "담아온 레시피" ? (
        <DummyBox>
          <BBox>
            <TextBox2>{"담아온 레시피 수 :"}</TextBox2>
            <TextBox2>
              <Link to={"/mypage/storerecipe"}>{user.userInfo.userStore}</Link>
              {"개"}
            </TextBox2>
          </BBox>
          <BBox2>
            <Button4
              onClick={() => {
                history.push("/mypage/storerecipe");
              }}
            >
              이동하기
            </Button4>
          </BBox2>
        </DummyBox>
      ) : null}

      {type === "작성한 레시피" ? (
        <DummyBox>
          <BBox>
            <TextBox2>{"작성한 레시피 수 :"}</TextBox2>
            <TextBox2>
              <Link to={"/mypage/addedrecipe"}>{user.userInfo.foodInfo}</Link>
              {" 개"}
            </TextBox2>
          </BBox>
          <BBox2>
            <Button4
              onClick={() => {
                history.push("/mypage/addedrecipe");
              }}
            >
              이동하기
            </Button4>
          </BBox2>
        </DummyBox>
      ) : null}
      {type === "구독한 유저들" ? (
        <DummyBox>
          <BBox>
            <TextBox2>{"구독한 유저들 수 :"}</TextBox2>
            <TextBox2>
              <Link to={"/mypage/subscribe"}>{user.userInfo.follow}</Link>
              {" 개"}
            </TextBox2>
          </BBox>
          <BBox2>
            <Button4
              onClick={() => {
                history.push("/mypage/subscribe");
              }}
            >
              이동하기
            </Button4>
          </BBox2>
        </DummyBox>
      ) : null}
    </Frame>
  );
}

export { ContextProfile, ContextPassword, ContextDefault };

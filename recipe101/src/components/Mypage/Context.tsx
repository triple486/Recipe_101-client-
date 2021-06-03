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
  padding: 10px;
  display: block;
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
  padding-left: 20px;
  align-items: center;
`;
const TextBox = styled.div`
  flex: 2 0 0;
  font-size: 11px;
  display: flex;
`;
const TextBox3 = styled.div`
  flex: 3 0 0;
  font-size: 11px;
  display: flex;
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
        <ProfiledataLine>
          <button
            onClick={() => {
              history.push("/mypage/profile");
            }}
          >
            수정
          </button>
        </ProfiledataLine>
      </ProfiledataBox>
    </Frame>
  );
}

const TextBox2 = styled.div`
  font-size: 15px;
  display: flex;
  padding-right: 20px;
`;

const DummyBox = styled.div`
  height: 100%;
  width: 100%;
  padding-top: 30px;
  padding-left: 20px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;
function ContextPassword() {
  return (
    <Frame>
      <DummyBox>
        <TextBox2>{"비밀번호"}</TextBox2>
        <TextBox2>
          <Link to={"/mypage/password"}>변경하기</Link>
        </TextBox2>
      </DummyBox>
    </Frame>
  );
}
function ContextDefault({ type }: { type: string }) {
  let user = useSelector((state: RootState) => state.userReducer);
  return (
    <Frame>
      {type === "작성한 감상평들" ? (
        <DummyBox>
          <TextBox2>{"작성한 감상평 수 :"}</TextBox2>
          <TextBox2>
            <Link to={"/mypage/addedcomment"}>{user.userInfo.comment}</Link>
            {"개"}
          </TextBox2>
        </DummyBox>
      ) : null}

      {type === "담아온 레시피" ? (
        <DummyBox>
          <TextBox2>{"담아온 레시피 수 :"}</TextBox2>
          <TextBox2>
            <Link to={"/mypage/storerecipe"}>{user.userInfo.userStore}</Link>
            {"개"}
          </TextBox2>
        </DummyBox>
      ) : null}

      {type === "작성한 레시피" ? (
        <DummyBox>
          <TextBox2>{"작성한 레시피 수 :"}</TextBox2>
          <TextBox2>
            <Link to={"/mypage/addedrecipe"}>{user.userInfo.foodInfo}</Link>
            {"개"}
          </TextBox2>
        </DummyBox>
      ) : null}
      {type === "구독한 유저들" ? (
        <DummyBox>
          <TextBox2>{"구독한 유저들 수 :"}</TextBox2>
          <TextBox2>
            <Link to={"/mypage/subscribe"}>{user.userInfo.follow}</Link>
            {"개"}
          </TextBox2>
        </DummyBox>
      ) : null}
    </Frame>
  );
}

export { ContextProfile, ContextPassword, ContextDefault };

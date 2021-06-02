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
  return (
    <Frame>
      <ProfileImageBox>
        <ProfileImage src={user.userInfo.userimage} />
      </ProfileImageBox>
      <ProfiledataBox>
        <ProfiledataLine>
          <TextBox>{"유저 네임"}</TextBox>
          <TextBox3>{user.userInfo.username}</TextBox3>
        </ProfiledataLine>
        <ProfiledataLine>
          <TextBox>{"이메일"}</TextBox>
          <TextBox3>{user.userInfo.email}</TextBox3>
        </ProfiledataLine>
        <ProfiledataLine>
          <TextBox>{"전화 번호"}</TextBox>
          <TextBox3>{user.userInfo.phone}</TextBox3>
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
  let history = useHistory();
  return (
    <Frame>
      {type === "작성한 감상평들" ? (
        <button
          onClick={() => {
            history.push("/mypage/addedcomment");
          }}
        >
          test
        </button>
      ) : null}

      {type === "담아온 레시피" ? (
        <button
          onClick={() => {
            history.push("/mypage/storerecipe");
          }}
        >
          test
        </button>
      ) : null}

      {type === "작성한 레시피" ? (
        <button
          onClick={() => {
            history.push("/mypage/addedrecipe");
          }}
        >
          test
        </button>
      ) : null}
      {type === "구독한 유저들" ? (
        <button
          onClick={() => {
            history.push("/mypage/subscribe");
          }}
        >
          test
        </button>
      ) : null}
    </Frame>
  );
}

export { ContextProfile, ContextPassword, ContextDefault };

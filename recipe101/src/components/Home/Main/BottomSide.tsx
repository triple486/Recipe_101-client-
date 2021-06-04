import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import logo2 from "../../../icon/logo2.png";
// import "../../css/index.css";
const Frame = styled.div`
  flex: 1 0 1;
  height: 80px;
  width: 100%;
  display: flex;
  justify-content: center;
  border-bottom: solid 1px black;
  background-color: white;

`;

const Body = styled.div`
  background-color: white;
  height: 100%;

  width: 100%;
  display: flex;

  flex-direction: row;
  max-width: 1500px;
  // flex: 1 0 0;
  margin: 0 auto;
`;

const Box = styled.div`
  background-color: white;
  height: 100%;
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: left;
  flex: 0 0 1;
  flex-direction: column;
`;

const Box2 = styled.div`
  background-color: white;
  height: 100%;
  width: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 1;
`;

const Logo = styled.img`
  margin-left: 10px;
  background-color: white;
  width: 250px;
  display: block;
  flex: 0 0 1;
`;

const TextBox = styled.div`
  text-decoration: none;
  color: #b17d55;
  background-color: white;
  margin-left: 15px;
`;
const TextBox1 = styled.div`
  margin-top: 40px;
  color: #b17d55;
  background-color: white;
`;
const TextBox2 = styled.div`
  color: #b17d55;
  background-color: white;
`;

const LongBox = styled.div`
  background-color: white;
  width: 240px;
  height: 100%;
`;
const Innerbox = styled.div`
  background-color: white;

  display: flex;
  width: 500px;
  flex-direction: row;
`;

export default function BottomSide() {
  let history = useHistory();
  return (
    <Frame>
      <Body>
        <Box2>
          <Logo src={logo2}></Logo>
        </Box2>
        <LongBox>
          <TextBox1>{"Copyright © 2021 recipe101"}</TextBox1>
        </LongBox>
        <Box>
          <TextBox>
            <a href="https://github.com/codestates/Recipe_101-client-">
              <TextBox>{"Repository"}</TextBox>
            </a>
          </TextBox>
          <TextBox>
            <a href="https://github.com/codestates/Recipe_101-client-/wiki">
              <TextBox>{"recipe101 wiki"}</TextBox>
            </a>
          </TextBox>
        </Box>
        <Box>
          <TextBox>{"Github"}</TextBox>
          <Innerbox>
            <TextBox2>
              <a href="https://github.com/karuiner">
                <TextBox>{"공인택"}</TextBox>
              </a>
            </TextBox2>
            <TextBox>
              <TextBox2>
                <a href="https://github.com/sejuda">
                  <TextBox>{"김세주"}</TextBox>
                </a>
              </TextBox2>
            </TextBox>
            <TextBox2>
              <TextBox>
                <a href="https://github.com/triple486">
                  <TextBox>{"방경태"}</TextBox>
                </a>
              </TextBox>
            </TextBox2>
            <TextBox2>
              <TextBox>
                <a href="https://github.com/jtlim0414">
                  <TextBox>{"임지택"}</TextBox>
                </a>
              </TextBox>
            </TextBox2>
          </Innerbox>
        </Box>
      </Body>
    </Frame>
  );
}

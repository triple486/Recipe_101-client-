import styled from "styled-components";
import logo2 from "../../../icon/logo2.png";
import '../../../css/Home/Bottomside.css';
const Frame = styled.div`
  flex: 1 0 1;
  height: 80px;
  width: 100%;
  display: flex;
  justify-content: center;
  // border-bottom: solid 1px black;
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
  flex: calc(10 / 4) 0 0;
  flex-direction: column;
  text-align: center;
`;

const Box1 = styled.div`
  background-color: white;
  height: 100%;
  width: 250px;
  display: flex;
  // justify-content: center;
  align-items: center;
  flex: 2.7 0 0;
  margin-left: 21px;
`;

const Box2 = styled.div`
  background-color: white;
  height: 100%;
  width: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 2.3 0 0;
  flex-direction: column;
  // margin-right: 20px;
`;

const Logo = styled.img`
  margin-left: 10px;
  background-color: white;
  width: 160px;
  display: block;
  flex: 0 0 1;
`;

const TextBox = styled.div`
  text-decoration: none;
  color: #b17d55;
  background-color: white;
  // margin-left: 15px;
`;
const TextBox1 = styled.div`
  color: #b17d55;
  background-color: white;
  margin-left: 8px;
`;
const TextBox2 = styled.div`
  color: #b17d55;
  background-color: white;
  flex: 2.5 0 0;
`;

const LongBox = styled.div`
  background-color: white;
  height: 100%;
  width: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: calc(10 / 4) 0 0;
  flex-direction: column;
  margin-right: 20px;
`;

const Innerbox = styled.div`
  background-color: white;

  display: flex;
  // width: 500px;
  flex-direction: row;
`;

export default function BottomSide() {
  return (
    <Frame>
      <Body>
        <Box1>
          <Logo src={logo2}></Logo>
          <TextBox1>{"Copyright © 2021 recipe101"}</TextBox1>
        </Box1>
        <Box2>
          <TextBox>
            <a className='bottomside_link' href="https://github.com/codestates/Recipe_101-client-">
              {"Repository"}
            </a>
          </TextBox>
        </Box2>
        <LongBox>
          <TextBox>
            <a className='bottomside_link' href="https://github.com/codestates/Recipe_101-client-/wiki">
              {"recipe101 wiki"}
            </a>
          </TextBox>
        </LongBox>
        <Box>
          <TextBox>{"Github"}</TextBox>
          <Innerbox>
            <TextBox2>
              <a className='bottomside_link' href="https://github.com/karuiner">
                {"공인택"}
              </a>
            </TextBox2>
            <TextBox2>
              <a className='bottomside_link' href="https://github.com/sejuda">
                {"김세주"}
              </a>
            </TextBox2>
            <TextBox2>
              <a className='bottomside_link' href="https://github.com/triple486">
                {"방경태"}
              </a>
            </TextBox2>
            <TextBox2>
              <a className='bottomside_link' href="https://github.com/jtlim0414">
                {"임지택"}
              </a>
            </TextBox2>
          </Innerbox>
        </Box>
      </Body>
    </Frame>
  );
}

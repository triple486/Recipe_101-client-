import styled from "styled-components";
import "../../../css/Home/Mainintro.css";
import img from "./armando-ascorve-morales-ypZI_CA91M0-unsplash.jpg";
import img3 from "../../../icon/mypage.gif";

const Frame = styled.div`
  // height: ${Math.floor((window.innerHeight - 100) * 0.8)}px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  max-width: 1500px;
  margin: 100px auto;
`;
const Innerframe = styled.div`
  // height: 80%;
  // width: 100%;
  display: flex;
  flex-direction: column;
  // border: solid 1px red;
`;

const Image = styled.img`
  // height: 670px;
  width: 100%;
  // object-fit: contain;
  // margin-top: 5%;
`;

function Mainintro() {
  return (
    <Frame>
      <Innerframe>
        <div className="mainintro_frame">
          <div className="mainintro_img_box">
            <Image src={img} />
          </div>
          <div className="mainintro_desc">
            <p className="mainintro_text">
              갈비탕은 누구나 좋아하는 음식이죠! 이런 음식에 대해 나만의
              레시피가 있다면 레시피 101에 조리법을 올려주세요! 누구나 좋아하는
              레시피를 만들어서 올릴 수 있습니다!
            </p>
          </div>
          <div className="mainintro_desc">
            <p className="mainintro_text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
              enim tortor, commodo eu cursus vitae, elementum in nibh. Sed
              rhoncus tempus lobortis. Suspendisse efficitur efficitur nulla,
              vitae lacinia tellus consectetur non. Pellentesque rutrum orci eu.
            </p>
          </div>
          <div className="mainintro_img_box">
            <Image src={img} />
          </div>
          <div className="mainintro_img_box">
            <Image src={img3} />
          </div>
          <div className="mainintro_desc">
            <p className="mainintro_text">
              마음에 드는 레시피를 발견했다면 , 클릭 해보세요! 그리고 레시피가
              맘에 들었다면 코멘트를 달아주세요! 내가 마음에 들었던 레시피들은
              마이페이지에 저장됩니다. 좋아하고 댓글을 달았던 레시피들만 모아서
              따로 보세요 !
            </p>
          </div>
        </div>
      </Innerframe>
    </Frame>
  );
}

export default Mainintro;

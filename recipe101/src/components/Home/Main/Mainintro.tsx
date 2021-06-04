import styled from "styled-components";
import "../../../css/Home/Mainintro.css";
import img from './armando-ascorve-morales-ypZI_CA91M0-unsplash.jpg'

const Frame = styled.div`
  // height: ${Math.floor((window.innerHeight - 100) * 0.8)}px;
  // width: 100%;
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
  width: 85%;
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
            <p className='mainintro_text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris enim tortor, commodo eu cursus vitae, elementum in nibh. Sed rhoncus tempus lobortis. Suspendisse efficitur efficitur nulla, vitae lacinia tellus consectetur non. Pellentesque rutrum orci eu.</p>
          </div>
          <div className="mainintro_desc">
            <p className='mainintro_text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris enim tortor, commodo eu cursus vitae, elementum in nibh. Sed rhoncus tempus lobortis. Suspendisse efficitur efficitur nulla, vitae lacinia tellus consectetur non. Pellentesque rutrum orci eu.</p>
          </div>
          <div className="mainintro_img_box">
            <Image src={img} />
          </div>
          <div className="mainintro_img_box">
            <Image src={img} />
          </div>
          <div className="mainintro_desc">
            <p className='mainintro_text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris enim tortor, commodo eu cursus vitae, elementum in nibh. Sed rhoncus tempus lobortis. Suspendisse efficitur efficitur nulla, vitae lacinia tellus consectetur non. Pellentesque rutrum orci eu.</p>
          </div>
        </div>
      </Innerframe>
    </Frame>
  );
}

export default Mainintro;

import React from "react";
import styled from "styled-components";
import "../../../css/Home/Mainintro.css";

const Frame = styled.div`
  height: ${Math.floor((window.innerHeight - 100) * 0.8)}px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;
const Innerframe = styled.div`
  height: 80%;
  width: 100%;
  display: flex;
  flex-direction: column;
  border: solid 1px red;
`;

function Mainintro() {
  return (
    <Frame>
      <Innerframe>
        <div className="mainintro_frame">
          <div className="mainintro_img">Image</div>
          <div className="mainintro_desc">Text</div>
          <div className="mainintro_desc">Text</div>
          <div className="mainintro_img">Image</div>
          <div className="mainintro_img">Image</div>
          <div className="mainintro_desc">Text</div>
        </div>
      </Innerframe>
    </Frame>
  );
}

export default Mainintro;

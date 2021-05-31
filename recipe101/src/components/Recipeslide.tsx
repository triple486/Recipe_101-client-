import styled from "styled-components";
import './Mainslide.css';

const Frame = styled.div`
  display: flex;
  flex: 0 0 1;
  padding: 20px;
  flex-direction: column;
  border: solid 1px black;
`;

const Image = styled.img`
  width: 100%;
`;
const Desc = styled.div`
  height: 20%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;
const Box = styled.div`
  flex: 1 0 1;
`;

function welcomeChobo(input: string){
  if(input === '초보환영'){
    return '초보 환영';
  } else {
    return input;
  }
}

function Recipeslide({
    data
  }: {
    data: {
      food_id: number;
      food_img: string;
      food_name: string;
      level: string;
      cooking_time: string;
      summary: string;
    };
  }) {
    return (
      <div className='slide'>
        <img className="slide_img" src={data.food_img} alt={data.food_name}/>
        <div className='slide_desc'>
          <div>{data.food_name}</div>
          <div>{welcomeChobo(data.level)}</div>
          <div>{data.cooking_time}</div>
          <div>{data.summary}</div>
        </div>
      </div>
    );
  }
  
  export default Recipeslide;
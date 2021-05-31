import styled from "styled-components";
import './Recipegrid.css';

function Recipegrid({
  data
}: {
  data: {
    food_id: number;
    food_img: string;
    food_name: string;
    level: string;
    cooking_time: string;
  };
}) {
  return (
    <div className='recipegrid_frame'>
      <img className='recipegrid_img' src={data.food_img}></img>
      <div className='recipegrid_desc'>
        <div className='recipegrid_data food_name'>{data.food_name}</div>
        <div className='recipegrid_data level'>{data.level}</div>
        <div className='recipegrid_data cooking_time'>{data.cooking_time}</div>
      </div>
    </div>
  );
}

export default Recipegrid;

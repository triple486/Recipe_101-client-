import "../../../css/Home/Recipegrid.css";
import { useHistory } from "react-router-dom";
function Recipegrid({
  data,
}: {
  data: {
    food_id: number;
    food_img: string;
    food_name: string;
    level: string;
    cooking_time: string;
  };
}) {
  let history = useHistory();
  return (
    <div className="recipegrid_frame">
      <div className="recipegrid_img_box">
        <img className="recipegrid_img" src={data.food_img} alt={"text"}
          onClick={() => {
            history.push(`/recipe/${data.food_id}`);
          }}
        ></img>
      </div>
      <div className="recipegrid_desc">
        <div className="recipegrid_data food_name"
          onClick={() => {
            history.push(`/recipe/${data.food_id}`);
          }}
        >{data.food_name}</div>
        {/* <div className="recipegrid_data level">{data.level}</div>
        <div className="recipegrid_data cooking_time">{data.cooking_time}</div> */}
      </div>
    </div>
  );
}

export default Recipegrid;

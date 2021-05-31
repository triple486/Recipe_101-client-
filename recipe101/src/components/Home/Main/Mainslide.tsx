import React from "react";
import axios from "axios";
import styled from "styled-components";
import "../../../css/Home/Mainslide.css";
import Recipeslide from "./Recipeslide";

const Frame = styled.div`
  height: 100%;
  // width: 100%;
  border: solid 1px green;
`;

const delay = 3000;

function Mainslide() {
  const [index, setIndex] = React.useState(0);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  let [recipes, setRecipes] = React.useState([]);
  let [loaded, setLoaded] = React.useState(false);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  React.useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setIndex((prevIndex) =>
        prevIndex === recipes.length - 1 ? 0 : prevIndex + 1
      );
    }, delay);
    return () => {
      resetTimeout();
    };
  }, [index]);

  let url = `${process.env.REACT_APP_SERVER_URL}/recommend/10`;

  if (!loaded) {
    axios.get(url).then((rst) => {
      console.log(rst);
      setRecipes(rst.data.data.recipe);
      setLoaded(true);
    });
  }

  return (
    <Frame>
      <div className="slideshow">
        <div
          className="slideshowSlider"
          style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
        >
          {recipes.map((x, index) => {
            return <Recipeslide key={index} data={x}></Recipeslide>;
          })}
        </div>
        <div className="slideshowDots">
          {recipes.map((_, idx) => (
            <div
              key={idx}
              className={`slideshowDot${index === idx ? " active" : ""}`}
              onClick={() => {
                setIndex(idx);
              }}
            ></div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

export default Mainslide;

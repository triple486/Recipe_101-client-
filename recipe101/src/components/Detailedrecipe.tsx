import styled from "styled-components";
import Recipecard from "./Recipecard";
import { useSelector } from "react-redux";
import { RootState } from "../redux/reducers";
import {
  Route,
  Switch,
  useHistory,
  useLocation,
  Link,
  Redirect,
  useParams,
  useRouteMatch,
} from "react-router-dom";

const Frame = styled.div`
  height: 100vh;
  width: 100vw;
`;

function Detailedrecipe() {
  let { id } = useParams<{ id?: string }>();
  let nid = Number(id) - 1;

  return <div></div>;
}

export default Detailedrecipe;

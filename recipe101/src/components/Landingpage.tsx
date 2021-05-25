import { useState } from "react";
import {
  Route,
  Switch,
  useHistory,
  useLocation,
  Link,
  Redirect,
  useRouteMatch,
} from "react-router-dom";
import styled from "styled-components";
import Maingrid from "./Maingrid";
import Mainslide from "./Mainslide";

import Login from "./Login";
import Resister from "./Resister";
import Searchbar from "./Searchbar";
import Searchresult from "./Searchresult";

const Frame = styled.div`
  flex: 1 0 0;
  height: 100%;
  width: 100%;
  border: solid 1px red;
`;

function Landingpage() {
  let [isSearch, isSearchf] = useState(false);
  let { path, url } = useRouteMatch();
  return (
    <Frame>
      <Searchbar search={[isSearch, isSearchf]}></Searchbar>
      {isSearch ? (
        <Searchresult></Searchresult>
      ) : (
        <div>
          <Mainslide></Mainslide>
          <Maingrid></Maingrid>
        </div>
      )}
      <Switch>
        <Route path={"/login"}>
          <Login></Login>
        </Route>
        <Route path={"/resister"}>
          <Resister></Resister>
        </Route>
      </Switch>
    </Frame>
  );
}

export default Landingpage;

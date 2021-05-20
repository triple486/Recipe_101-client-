import { useState } from "react";
import ReactDOM from "react-dom";
import { Switch, Route, withRouter } from "react-router-dom";
import BaseModalWrapper from "./components/modal/BaseModalWrapper";
import RegisterPage from "./components/modal/RegisterPage";

import "./index.css";

const App = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={BaseModalWrapper} />
        <Route exact path="/register" component={RegisterPage} />
      </Switch>
    </>
  );
};

export default withRouter(App);

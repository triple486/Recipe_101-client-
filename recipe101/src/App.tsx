import { useState } from 'react'
import ReactDOM from 'react-dom';
import { Switch, Route, Redirect, withRouter } from "react-router-dom";

import './index.css'; 
import RegisterPage from './components/modal/RegisterPage';
import Modal from './components/modal/Modal';
import { BtnOpenModal, BackDrop } from './ui/Modal';
import BaseModalWrapper from './components/modal/BaseModalWrapper';

interface AppProps {
  show: boolean;
}

const App = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={BaseModalWrapper} />
        <Route exact path="/register" component={RegisterPage} />
      </Switch>
    </>
  );

}


export default withRouter(App)

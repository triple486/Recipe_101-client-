import { Route, Switch, useHistory, useLocation, Link } from "react-router-dom";
import styled from "styled-components";
import Modal from "./Modal";
const Frame = styled.div`
  height: 40%;
  width: 40%;
  display: flex;
  border: solid 1px red;
`;

function Resister() {
  let history = useHistory();
  return (
    <Modal>
      <Frame>
        <button
          onClick={() => {
            history.push("/");
          }}
        >
          back
        </button>
        <button onClick={() => {}}>not work (maybe "ok")</button>
      </Frame>
    </Modal>
  );
}

export default Resister;

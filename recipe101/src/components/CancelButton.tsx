import styled from "styled-components";
import { Route, Switch, useHistory, useLocation, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { isOn } from "../redux/modalReducer";
const CancelButton = styled.button`
  height: 20px;
  width: 20px;
  display: flex;
  border-radius: 50%;
  padding: 2px;
  background-color: grey;
  border: solid 1px black;
`;

const CancelLine = styled.div`
  height: 20px;
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
`;

export default function ({ to }: { to: string }) {
  let history = useHistory();
  let dispatch = useDispatch();
  return (
    <CancelLine>
      <CancelButton
        onClick={() => {
          dispatch(isOn(false));
          history.push(to);
        }}
      >
        <span></span>
      </CancelButton>
    </CancelLine>
  );
}

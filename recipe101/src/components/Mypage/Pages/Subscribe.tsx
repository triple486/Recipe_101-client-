import styled from "styled-components";
import { RootState } from "../../../redux/reducers";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
axios.defaults.withCredentials = true;
const Frame = styled.div`
  height: ${window.innerHeight - 100}px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export default function Profile() {
  let user = useSelector((state: RootState) => state.userReducer);
  let accessToken = useSelector((state: RootState) => state.tokenReducer);
  const config = {
    headers: {
      authorization: "bearer " + accessToken,
    },
  };
  return <Frame></Frame>;
}

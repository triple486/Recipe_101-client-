import styled from "styled-components";
import { RootState } from "../../../redux/reducers";
import { useSelector, useDispatch } from "react-redux";
const Frame = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export default function Profile() {
  return <Frame></Frame>;
}

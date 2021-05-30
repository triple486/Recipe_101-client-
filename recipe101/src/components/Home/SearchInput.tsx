import { useState } from "react";
import {
  Route,
  Switch,
  useHistory,
  useLocation,
  Link,
  Redirect,
} from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { useDispatch } from "react-redux";
import { isSearch, isFail, searchRecipe } from "../../redux/searchReducer";
const Search = styled.div`
  flex: 2 0 0;
  display: flex;
  padding-right: 30px;
  height: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

const Select = styled.select`
  height: 50px;
`;
const Input = styled.input`
  height: 50px;
  width: 60%;
  text-align: right;
  text-indent: -5em;
`;

const Button = styled.button`
  height: 50px;
  width: 50px;
`;

export default function () {
  let [type, typef] = useState("username");
  let [input, inputf] = useState("");
  let history = useHistory();
  let dispatch = useDispatch();
  function searchfunction() {
    let url = `${process.env.REACT_APP_SERVER_URL}/search/${type}/${input}`;
    dispatch(isFail(false));
    axios
      .get(url)
      .then((rst) => {
        inputf("");
        dispatch(searchRecipe(rst.data.data.recipe));
        dispatch(isSearch(true));
      })
      .catch((err) => {
        dispatch(isSearch(true));
        dispatch(isFail(true));
      })
      .finally(() => {
        history.push("/search");
      });
  }

  return (
    <Search>
      <Select
        onChange={(e) => {
          switch (e.target.selectedIndex) {
            case 0:
              typef("username");
              break;

            case 1:
              typef("foodname");

              break;
            case 2:
              typef("itemname");

              break;
          }
        }}
      >
        <option>{"작성자"}</option>
        <option>{"요리명"}</option>
        <option>{"재료명"}</option>
      </Select>
      <Input
        value={input}
        onChange={(e) => {
          inputf(e.target.value);
        }}
      ></Input>
      <Button onClick={searchfunction}>{"검색"}</Button>
    </Search>
  );
}

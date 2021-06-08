import { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { useDispatch } from "react-redux";
import { isSearch, isFail, searchRecipe } from "../../redux/searchReducer";
import { updateLogin, updateUserInfo } from "../../redux/userReducer";
import { storeToken } from "../../redux/tokenReducer";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faUser,
  faUtensils,
  faCarrot,
} from "@fortawesome/free-solid-svg-icons";
import "../../css/SearchInput.css";

const Search = styled.div`
  flex: 2 0 0;
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

const SearchBox = styled.div`
  height: 40px;
  background: white;
  border-radius: 20px;
`;

const SelectBox = styled.div`
  display: inline-block;
  margin: 2px 10px 0 10px;

  vertical-align: top;
`;

const Select = styled.div<{ type: string; name: string }>`
  display: inline-block;
  border: 1px solid transparent;
  ${({ type, name }) => (type === name ? `border-color:black;` : "")}
  border-radius: 50%;
`;
const Input = styled.input`
  width: 350px;
  height: 40px;
  line-height: 30px;
  outline: 0;
  border: 0;
  font-size: 1em;
  padding-left: 13px;
  padding-right: 20px;

  vertical-align: top;
`;

export default function SearchInput() {
  let [type, typef] = useState("username");
  let [input, inputf] = useState("");
  let history = useHistory();
  let dispatch = useDispatch();
  console.log(type, input);

  function selecter(type: string) {
    return () => {
      typef(type);
    };
  }
  function searchfunction() {
    dispatch(isFail(false));
    let url = `${process.env.REACT_APP_SERVER_URL}/search/${type}/${input}`;
    axios
      .get(url)
      .then((rst) => {
        inputf("");
        dispatch(searchRecipe(rst.data.data.recipe));
        dispatch(isSearch(true));
        sessionStorage.setItem("isSearch", type);
        sessionStorage.setItem("type", type);
        sessionStorage.setItem("input", input);
      })
      .catch((err) => {
        dispatch(isSearch(true));
        dispatch(isFail(true));
      })
      .finally(() => {
        history.push("/search");
      });
  }
  useEffect(() => {
    sessionStorage.getItem("isSearch");
    let type = sessionStorage.getItem("type") || undefined;
    let input = sessionStorage.getItem("input") || undefined;
    let url = `${process.env.REACT_APP_SERVER_URL}/search/${type}/${input}`;

    axios
      .get(process.env.REACT_APP_SERVER_URL + "/refresh")
      .then((res) => {
        dispatch(storeToken(res.data.data.accessToken));
        dispatch(updateLogin(true));
        dispatch(updateUserInfo(res.data.data.userinfo));
        if (sessionStorage.getItem("isSearch")) {
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
            });
        }
      })
      .catch();

    return;
  }, [dispatch]);

  return (
    <Search>
      <SearchBox>
        <SelectBox>
          <Select type={type} name={"username"}>
            <FontAwesomeIcon
              icon={faUser}
              onClick={selecter("username")}
              className="search_icon user"
            />
          </Select>

          <Select type={type} name={"foodname"}>
            <FontAwesomeIcon
              icon={faUtensils}
              onClick={selecter("foodname")}
              className="search_icon food"
            />
          </Select>
          <Select type={type} name={"itemname"}>
            <FontAwesomeIcon
              icon={faCarrot}
              onClick={selecter("itemname")}
              className="search_icon item"
            />
          </Select>
        </SelectBox>
        <Input
          value={input}
          onChange={(e) => {
            inputf(e.target.value);
          }}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              searchfunction();
            }
          }}
        ></Input>
        <FontAwesomeIcon
          icon={faSearch}
          onClick={searchfunction}
          className="search_icon search"
        />

        {/* <Button onClick={searchfunction}>{"검색"}</Button> */}
      </SearchBox>
    </Search>
  );
}

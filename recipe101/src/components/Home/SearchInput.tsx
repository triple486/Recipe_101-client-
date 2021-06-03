import { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { useDispatch } from "react-redux";
import { isSearch, isFail, searchRecipe } from "../../redux/searchReducer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faUtensils, faCarrot } from "@fortawesome/free-solid-svg-icons";
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
  // border: 1px solid black;
  background: white;
  border-radius: 20px;
`;

const SelectBox = styled.div`
  display: inline-block;
  margin: 7px 10px 0 10px;
  vertical-align: top;
`;

const Select = styled.select`
  height: 50px;
`;
const Input = styled.input`
  // height: 50px;
  // width: 60%;
  // text-align: right;
  // text-indent: -5em;
  // background: #B17D55;
    // position: absolute;
    top: 0;
    left: 0;
    width: 350px;
    height: 40px;
    line-height: 30px;
    outline: 0;
    border: 0;
    // display: none;
    font-size: 1em;
    // border-radius: 20px;
    padding-left: 13px;
    padding-right: 20px;

    vertical-align: top;
`;

const Button = styled.button`
  height: 50px;
  width: 50px;
  background: #B17D55;
`;

export default function () {
  let [type, typef] = useState("username");
  let [input, inputf] = useState("");
  let history = useHistory();
  let dispatch = useDispatch();
  console.log(type, input);
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
      <SearchBox>
        {/* <Select
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
        </Select> */}
        <SelectBox>
          <FontAwesomeIcon icon={faUser} onClick={searchfunction} className='search_icon user' />
          <FontAwesomeIcon icon={faUtensils} onClick={searchfunction} className='search_icon food' />
          <FontAwesomeIcon icon={faCarrot} onClick={searchfunction} className='search_icon item' />
        </SelectBox>
        <Input
          value={input}
          onChange={(e) => {
            inputf(e.target.value);
          }}
        ></Input>
        <FontAwesomeIcon icon={faSearch} onClick={searchfunction} className='search_icon search' />
        
        {/* <Button onClick={searchfunction}>{"검색"}</Button> */}
      </SearchBox>
    </Search>
  );
}

import styled from "styled-components"

export const Body = styled("div")`
    font-family:"Raleway";
`

export const Center = styled('div')`
    position: absolute;
    top: 50%;
    left: 50%;
    trnasfrom: translate(-50%, -50%)
`

export const Overlay = styled("div")`
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100vh;
    z-index: 1;
    background: rgba(0, 0, 0, 0.5);
    display: none;
`

export const Popup = styled("div")`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    height: 440px;
    background: #f5f5f5;
    z-index:2;
    box-shadow: 5px 5px 3px rgba(0,0,0,0.2);
`

export const Popup_close = styled("div")`
    position: absolute;
    top: -10px;
    right: -10px;
    width: 30px;
    height: 30px;
    background: #555;
    color: #f5f5f5;
    font-size: 25px;
    font-weight: 600;
    text-align: center;
    border-radius: 50%;
    cursor:pointer;
`

export const Avatar = styled('div')`
    margin: 30px 0px 20px;
    text-align: center;
`

export const Img = styled('img')`
    width: 120px;
    border-radius: 50%;
`

export const Header = styled("div")`
    text-align: center;
    font-size: 20px;
    font-weight: 600;
    color: #222;
    margin: 20px 0px;
`

export const Element = styled("div")`
    padding: 8px 20px;
`

export const Label = styled("label")`
    display: block;
    font-size: 14px;
    color: #222;
    margin-bottom: 5px;
`

export const Input = styled("input")`
    width: 100%;
    padding: 8px 10px;
    box-sizing: border-box;
    outline: none;
    border: 1px solid #aaa;
    background: #eee;
    border-radius: 5px;
`

export const Button = styled("button")`
    margin-top: 5px;
    width: 100%;
    padding: 10px 0px;
    text-transform: uppercase;
    outline: none;
    border: none;
    font-size: 15px;
    font-weight: 600;
    border-radius: 5px;
    cursor: pointer;
    background: #4889da;
    color: #f5f5f5;
`
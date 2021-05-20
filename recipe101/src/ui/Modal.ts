import styled from 'styled-components'

export const BtnOpenModal = styled("button")`
    background: #2c2c2c;
    color: #eee;
    font-size: 1rem;
    margin: 2rem;
    padding: 0.5rem 1.8rem;
    border: none;
    outline: none;
    cursor: pointer;
`

export const ModalWrapper = styled("div")`
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Arial, Helvetica, sans-serif;
    background: white;
    width: 80%;
    max-width: 800px;
    margin: 4rem auto;
`


export const ModalHeader = styled("div")`
    background: #2c2c2c;
    color: #e9e9e9;
    padding: 1rem;
    display: flex;
    align-itmes: center;
    justify-content: space-between
`

export const CloseButton = styled("div")`
    font-size: 1.5rem;
    cursor: pointer;  
`


export const ModalContent = styled("div")`
    padding: 1.5rem 1rem;

`

export const H4 = styled("h4")`
    font-size: 1.8rem;
    color: #DD501D;
`

export const P = styled("p")`
    font-size: 1rem;
    background: #eee;
    color: #333;
    padding: 1rem;
    margin: 1rem 0 2rem 0;  

`

export const FooterButton = styled('button')`
    display: block;
    font-size: 1rem;
    margin-left: auto;
    padding: 0.5rem 1.8rem;
    background: #DD501D;
    color: #fff;
    border: none;
    outline: none;
    cursor: pointer;
`

export const BackDrop = styled("div")`
    background: rgba(63,61,61,0.692);
    height: 100%;
    position: fixed;
    transition: all 1.3s;
    width: 100%;   
`
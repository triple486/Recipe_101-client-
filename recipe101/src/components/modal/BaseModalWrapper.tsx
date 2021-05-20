
import { useState } from 'react'
import Modal from './Modal';
import { BackDrop, BtnOpenModal } from '../../ui/Modal'
import LoginPage from './LoginPage';
import { Link } from 'react-router-dom';



const BaseModalWrapper = () => {

    const [show, setShow]  = useState(false)

    const closeModalHandler = () => setShow(false)

    return (
        <div>
        { show ? <BackDrop onClick={closeModalHandler} ></BackDrop>: null}
        <BtnOpenModal onClick={() =>setShow(true)} >Open Modal</BtnOpenModal>
        <LoginPage show={show} close={closeModalHandler}/>
        </div>
    );
}


export default BaseModalWrapper;
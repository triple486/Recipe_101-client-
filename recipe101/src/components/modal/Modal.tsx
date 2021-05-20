
import React from 'react'
import { ModalHeader, ModalWrapper, CloseButton, ModalContent, H4, P, FooterButton } from '../../ui/Modal'



interface ModalProps {
    show: boolean;
    close: () => void;
}

const Modal : React.FC<ModalProps> = ({show, close}) => {

    return (
        <>
        <ModalWrapper style={{
            transform: show? 'translateY(0vh)' : 'translateY(-100vh)',
            opacity: show ? "1" : "0"
            }}>
            <ModalHeader>
                <p>Welcome To Out Site</p>
                <CloseButton onClick={close}>x</CloseButton>
            </ModalHeader>
            <ModalContent>
                <div className="modal-body">
                    <H4>Modal</H4>
                    <P>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit commodi ad expedita quo facilis itaque eius, porro eligendi esse? Harum.</P>
                </div>
                <div className="modal-footer">
                    <FooterButton onClick={close}>Close</FooterButton>
                </div>
            </ModalContent>

        </ModalWrapper>
        </>
    );
}

export default Modal


import { ModalOverlay } from './Modal.styled';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('modal');

export const Modal = ({ image }) => {
  return createPortal(
    <ModalOverlay>
      <Modal>
        <img src="" alt="" />
      </Modal>
    </ModalOverlay>,
    modalRoot
  );
};

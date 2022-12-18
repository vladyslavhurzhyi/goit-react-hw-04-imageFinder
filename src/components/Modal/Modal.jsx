import { ModalOverlay, ModalStyled } from './Modal.styled';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';

const modalRoot = document.querySelector('#modal');

export const Modal = ({ showModal, largeImage }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = event => {
    if (event.code === 'Escape') {
      showModal();
    }
  };

  const handleBackdropClick = event => {
    if (event.target === event.currentTarget) {
      showModal();
    }
  };

  return createPortal(
    <ModalOverlay onClick={handleBackdropClick}>
      <ModalStyled>
        <img src={largeImage} alt={largeImage} />
      </ModalStyled>
    </ModalOverlay>,
    modalRoot
  );
};

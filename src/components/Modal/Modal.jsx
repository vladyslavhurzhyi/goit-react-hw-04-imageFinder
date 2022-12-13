import { ModalOverlay, ModalStyled } from './Modal.styled';
import { createPortal } from 'react-dom';
import { Component } from 'react';

const modalRoot = document.querySelector('#modal');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.showModal();
    }
  };

  handleBackdropClick = event => {
    if (event.target === event.currentTarget) {
      this.props.showModal();
    }
  };

  render() {
    return createPortal(
      <ModalOverlay onClick={this.handleBackdropClick}>
        <ModalStyled>
          <img src={this.props.largeImage} alt={this.props.largeImage} />
        </ModalStyled>
      </ModalOverlay>,
      modalRoot
    );
  }
}

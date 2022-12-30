import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Overlay, ModalEl } from './Modal.styled';


export const Modal = ({ largeImageUrl, onClick }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClick();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClick]);

  const handleCloseModal = e => {
    if (e.target === e.currentTarget) {
      onClick();
    }
  };

  
  return (
    <Overlay id="Overlay" onClick={handleCloseModal}>
      <ModalEl>
        <img src={largeImageUrl} alt="" />
      </ModalEl>
    </Overlay>
  );
};

Modal.propTypes = {
  largeImageUrl: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

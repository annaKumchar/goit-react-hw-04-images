import PropTypes from 'prop-types';
import { Overlay, ModalEl } from './Modal.styled';
export const Modal = ({ largeImageUrl, onClick }) => {
  return (
    <Overlay id="Overlay" onClick={onClick}>
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

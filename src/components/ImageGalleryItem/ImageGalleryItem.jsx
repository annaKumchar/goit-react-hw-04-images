import PropTypes from 'prop-types';
import { GalleryItemEl, GalleryImage } from './ImageGalleryItem.styled';

export const GalleryItem = ({ webformatURL, onClick, largeImageURL }) => {
  return (
    <GalleryItemEl onClick={() => onClick(largeImageURL)}>
      <GalleryImage src={webformatURL} />
    </GalleryItemEl>
  );
};
GalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string,
};

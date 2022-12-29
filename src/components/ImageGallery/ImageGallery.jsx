import PropTypes from 'prop-types';
import React from 'react';
import { GalleryEl } from './ImageGallery.styled';
import { GalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { LoadMore } from 'components/Button/Button';

export const ImageGallery = ({ images, onClick, totalHits }) => {
  return (
    <>
      <GalleryEl>
        {images.map(({ id, webformatURL, largeImageURL }) => (
          <GalleryItem
            key={id}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            onClick={onClick}
          />
        ))}
      </GalleryEl>
      {images.length < totalHits ? <LoadMore onClick={onClick} /> : null}
    </>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array,
  webformatURL: PropTypes.string,
  totalHits: PropTypes.number,
  onClick: PropTypes.func.isRequired,
};

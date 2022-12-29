import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

import { fetchImages } from './PixabayApiService/PixabayApiService';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { LoadMore } from './Button/Button';
import { Modal } from './Modal/Modal';

export function App() {
  const [searchQuery, setSearchQuery] = useState(null);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [modalImageURL, setModalImageURL] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [totalHits, setTotalHits] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    handleFetch();
  }, [searchQuery, page]);

  const handleFetch = async () => {
    try {
      setIsLoading(true);
      const results = await fetchImages(searchQuery, page);
      const { hits, totalHits } = results.data;
      setImages(prevImages => [...prevImages, ...hits]);
      setTotalHits(totalHits);

      if (hits.length === 0) {
        return toast.error(
          'Sorry, there are no images matching your search query. Please try again'
        );
      }
    } catch (error) {
      console.log('Error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = search => {
    setSearchQuery(search);
    setPage(1);
    setImages([]);
  };

  const handleItemClick = largeImageURL => {
    setModalImageURL(largeImageURL);
    setShowModal(true);
  };

  const handleOverlayClick = e => {
    const overlay = document.getElementById('Overlay');
    if (e.target === overlay) {
      setShowModal(false);
    }
  };

  const loadMore = () => {
    setPage(page => page + 1);
  };

  return (
    <div>
      <Searchbar searchSubmit={handleFormSubmit} />

      {isLoading ? <Loader /> : null}

      <ImageGallery images={images} onClick={handleItemClick} />

      {totalHits > images.length && <LoadMore onClick={loadMore} />}

      <ToastContainer autoClose={3000} theme="colored" />
      {showModal ? (
        <Modal onClick={handleOverlayClick} largeImageUrl={modalImageURL} />
      ) : null}
    </div>
  );
}

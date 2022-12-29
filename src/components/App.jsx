import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

import { fetchImages } from './PixabayApiService/PixabayApiService';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { LoadMore } from './Button/Button';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    searchQuery: null,
    images: [],
    page: 1,
    error: null,
    modalImageURL: null,
    isLoading: false,
    totalHits: 0,
    showModal: false,
  };

  componentDidUpdate(_, prevState) {
    const { searchQuery, page } = this.state;
    if (
      (prevState.page !== page && page > 1) ||
      (searchQuery !== prevState.searchQuery && searchQuery !== '')
    ) {
      this.handleFetch();
    }
  }

  handleFetch = async () => {
    try {
      this.setState({ isLoading: true });
      const { searchQuery, page } = this.state;
      const results = await fetchImages(searchQuery, page);
      const { hits, totalHits } = results.data;
      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        totalHits: totalHits,
      }));

      if (hits.length === 0) {
        return toast.error(
          'Sorry, there are no images matching your search query. Please try again'
        );
      }
    } catch (error) {
      console.log('Error');
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleFormSubmit = search => {
    const { searchQuery } = this.state;
    if (searchQuery === search) {
      return;
    }
    this.setState({ searchQuery: search, page: 1, images: [] });
  };

  handleItemClick = largeImageURL => {

    this.setState({
      modalImageURL: largeImageURL,
      showModal: true,
    });
  };

  handleOverlayClick = e => {
    const overlay = document.getElementById('Overlay');
    if (e.target === overlay) {
      this.setState({ showModal: false });
    }
  };

  loadMore = () => {
    this.setState(({ page }) => {
      return {
        page: page + 1,
      };
    });
  };

  render() {
    const { images, isLoading, totalHits, showModal, modalImageURL } =
      this.state;

    return (
      <div>
        <Searchbar searchSubmit={this.handleFormSubmit} />

        {isLoading ? <Loader /> : null}

        <ImageGallery images={images} onClick={this.handleItemClick} />

        {totalHits > images.length && (
          <LoadMore onClick={this.loadMore} />
        )}

        <ToastContainer autoClose={3000} theme="colored" />
        {showModal ? (
          <Modal
            onClick={this.handleOverlayClick}
            largeImageUrl={modalImageURL}
          />
        ) : null}
      </div>
    );
  }
}

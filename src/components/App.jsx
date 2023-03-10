import { FetchPixabayImage } from 'API/PixabayAPI';
import { useState, useEffect } from 'react';
import { AppWrap } from './App.styled';
import { ButtonStyled } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { SearchBar } from './SearchBar/SearchBar';

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [totalHits, setTotalHits] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState({});

  const handleSubmit = searchQuery => {
    if (searchQuery === query) {
      return;
    }
    setPage(1);
    setQuery(searchQuery);
    setImages([]);
  };

  const openModal = largeImage => {
    setShowModal(prevState => !prevState);
    setModalImage(largeImage);
  };

  useEffect(() => {
    async function getImages(query) {
      if (!query) {
        return;
      }

      setIsLoading(true);
      try {
        const { hits, totalHits } = await FetchPixabayImage(query, page);

        if (totalHits < 1) {
          setError(`${query} не найдено. Измените запрос.`);
        } else {
          setError(null);
        }

        setImages(prevState => {
          return [...prevState, ...hits];
        });
        setTotalHits(totalHits);
      } catch (error) {
        setError('Что-то пошло не так...');
      } finally {
        setIsLoading(false);
      }
    }

    getImages(query);
  }, [page, query]);

  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const lastPage = Math.ceil(totalHits / 12) > page;

  return (
    <AppWrap>
      <SearchBar handleSubmit={handleSubmit} />
      {showModal && <Modal showModal={openModal} largeImage={modalImage} />}
      {images && <ImageGallery images={images} openModal={openModal} />}
      {isLoading && <Loader />}
      {error && <p style={{ color: 'red' }}> {error} </p>}
      {images.length > 0 && lastPage && (
        <ButtonStyled onClickLoadMore={loadMore} />
      )}
    </AppWrap>
  );
};

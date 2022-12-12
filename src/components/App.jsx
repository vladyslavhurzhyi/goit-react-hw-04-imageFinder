import { FetchPixabayImage } from 'API/PixabayAPI';
import { Component } from 'react';
import { AppWrap } from './App.styled';
import { ButtonStyled } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { SearchBar } from './SearchBar/SearchBar';

export class App extends Component {
  state = {
    query: null,
    images: [],
    totalHits: null,
    error: null,
    page: 1,
  };

  getQuery = async query => {
    this.setState({
      searchQuery: query,
    });

    await this.getImages(query);
  };

  resetStateImage() {
    this.setState({
      images: [],
    });
  }

  async getImages(query) {
    try {
      const { data: response } = await FetchPixabayImage(
        query,
        this.state.page
      );
      const { hits, totalHits } = response;

      if (totalHits < 1) {
        this.setState({
          error: `${query} не найдено. Измените запрос.`,
        });
      } else {
        this.setState({
          error: null,
        });
      }

      return this.setState({
        images: hits,
        totalHits: totalHits,
      });
    } catch (error) {
      this.resetStateImage();
      this.setState({
        error: 'Что-то пошло не так...',
      });
    }
  }

  render() {
    const { error, images } = this.state;
    return (
      <AppWrap>
        <SearchBar
          getQuery={query => {
            this.getQuery(query);
          }}
        />
        {images && <ImageGallery images={images} />}
        {error && <p style={{ color: 'red' }}> {error} </p>}
        {images.length > 0 && <ButtonStyled />}
      </AppWrap>
    );
  }
}

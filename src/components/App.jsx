import { FetchPixabayImage } from 'API/PixabayAPI';
import { Component } from 'react';
import { AppWrap } from './App.styled';
import { ButtonStyled } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { SearchBar } from './SearchBar/SearchBar';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    totalHits: null,
    error: null,
  };

  // удалить если не надо!!!!!!!!!!
  // getQuery = async query => {
  //   this.setState({
  //     searchQuery: query,
  //   });

  //   await this.getImages(query);
  // };

  handleSubmit(event) {
    event.preventDefault();

    if (
      event.target.elements.query.value.trim() === '' ||
      event.target.elements.query.value === this.state.query
    ) {
      return;
    }

    this.setState({
      page: 1,
      query: event.target.elements.query.value,
      images: [],
    });
  }

  componentDidUpdate(_, prevState) {
    if (
      prevState.page !== this.state.page ||
      prevState.query !== this.state.query
    ) {
      this.getImages(this.state.query);
    }
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

      if (this.state.page > 1) {
        this.setState(prevState => {
          return {
            images: [...prevState.images, ...hits],
            totalHits: totalHits,
          };
        });
      } else
        this.setState({
          images: hits,
          totalHits: totalHits,
        });
    } catch (error) {
      this.setState({
        error: 'Что-то пошло не так...',
      });
    }
  }

  loadMore = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  render() {
    const { error, images } = this.state;
    return (
      <AppWrap>
        <SearchBar
          handleSubmit={event => {
            this.handleSubmit(event);
          }}
        />
        {images && <ImageGallery images={images} />}
        {error && <p style={{ color: 'red' }}> {error} </p>}
        {images.length > 0 && <ButtonStyled onClickLoadMore={this.loadMore} />}
      </AppWrap>
    );
  }
}

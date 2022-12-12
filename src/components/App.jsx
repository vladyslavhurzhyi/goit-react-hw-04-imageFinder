import { FetchPixabayImage } from 'API/PixabayAPI';
import { Component } from 'react';
import { AppWrap } from './App.styled';
import { ButtonStyled } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { SearchBar } from './SearchBar/SearchBar';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    totalHits: null,
    error: null,
    isLoading: false,
    showModal: false,
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.page !== this.state.page ||
      prevState.query !== this.state.query
    ) {
      this.getImages(this.state.query);
    }
  }

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

  showModal = () => {
    this.setState(prevState => {
      return { showModal: !prevState.showModal };
    });
  };

  async getImages(query) {
    this.setState({ isLoading: true });
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
    } finally {
      this.setState({ isLoading: false });
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
        {images && <ImageGallery images={images} openModal={this.showModal} />}
        {this.state.isLoading && <Loader />}
        {error && <p style={{ color: 'red' }}> {error} </p>}
        {images.length > 0 && <ButtonStyled onClickLoadMore={this.loadMore} />}
      </AppWrap>
    );
  }
}

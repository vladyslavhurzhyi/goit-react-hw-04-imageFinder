import { Component } from 'react';
import { SearchbaWrap, Form, Button, Input } from './SearchBar.styled';
import { AiOutlineSearch } from 'react-icons/ai';

export class SearchBar extends Component {
  state = {
    query: null,
    inputValue: '',
  };

  changeInput(e) {
    this.setState({
      inputValue: e.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.inputValue.trim() === '') {
      return;
    }

    this.setState(prevState => {
      return {
        query: prevState.inputValue,
      };
    });

    this.props.getQuery(this.state.inputValue);

    this.setState({
      inputValue: '',
    });
  }

  render() {
    return (
      <SearchbaWrap>
        <Form
          onSubmit={event => {
            this.handleSubmit(event);
          }}
        >
          <Button type="submit">
            <AiOutlineSearch size={20} />
          </Button>

          <Input
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.inputValue}
            onChange={e => {
              this.changeInput(e);
            }}
          />
        </Form>
      </SearchbaWrap>
    );
  }
}

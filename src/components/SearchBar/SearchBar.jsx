import { Component } from 'react';
import { SearchbaWrap, Form, Button, Input } from './SearchBar.styled';
import { AiOutlineSearch } from 'react-icons/ai';

export class SearchBar extends Component {
  state = {
    inputValue: '',
  };

  changeInput(e) {
    this.setState({
      inputValue: e.target.value,
    });
  }

  inputSubmit(event) {
    event.preventDefault();

    if (event.target.elements.query.value.trim() === '') {
      return;
    }

    this.props.handleSubmit(event);

    this.setState({ inputValue: '' });
  }

  render() {
    return (
      <SearchbaWrap>
        <Form
          onSubmit={event => {
            this.inputSubmit(event);
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
            name="query"
            onChange={e => {
              this.changeInput(e);
            }}
          />
        </Form>
      </SearchbaWrap>
    );
  }
}

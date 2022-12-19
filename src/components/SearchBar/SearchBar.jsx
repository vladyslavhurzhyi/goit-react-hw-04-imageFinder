import { useState } from 'react';
import { SearchbaWrap, Form, Button, Input } from './SearchBar.styled';
import { AiOutlineSearch } from 'react-icons/ai';

export const SearchBar = ({ handleSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const changeInput = e => {
    setInputValue(e.target.value);
  };

  const inputSubmit = event => {
    event.preventDefault();

    if (event.target.elements.query.value.trim() === '') {
      return;
    }

    handleSubmit(event.target.elements.query.value);

    setInputValue('');
  };

  return (
    <SearchbaWrap>
      <Form onSubmit={inputSubmit}>
        <Button type="submit">
          <AiOutlineSearch size={20} />
        </Button>

        <Input
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={inputValue}
          name="query"
          onChange={changeInput}
        />
      </Form>
    </SearchbaWrap>
  );
};

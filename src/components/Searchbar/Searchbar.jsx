import { useState } from 'react';
import { HiSearch } from 'react-icons/hi';
import { toast } from 'react-toastify';

import {
  SearchbarForm,
  Form,
  ButtonForm,
  ButtonLabel,
  InputForm,
} from './Searchbar.styled';

export function Searchbar({ searchSubmit }) {
  const [name, setName] = useState('');

  const handleNameChange = e => {
    setName(e.currentTarget.value.toLowerCase());
  };
  const handleSubmit = e => {
    e.preventDefault();

    if (name.trim() === '') {
      return toast.error('Please, enter query!');
    }
    setName('');
    searchSubmit(name);
  };

  return (
    <SearchbarForm onSubmit={handleSubmit}>
      <Form>
        <ButtonForm type="submit">
          <HiSearch />
          <ButtonLabel>Search</ButtonLabel>
        </ButtonForm>
        <InputForm
          value={name}
          onChange={handleNameChange}
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </Form>
    </SearchbarForm>
  );
}

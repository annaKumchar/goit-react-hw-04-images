import React, { Component } from 'react';
import { HiSearch } from 'react-icons/hi';
import { toast } from 'react-toastify';

import {
  SearchbarForm,
  Form,
  ButtonForm,
  ButtonLabel,
  InputForm,
} from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    name: '',
    pictures: [],
  };

  handleNameChange = e => {
    this.setState({ name: e.currentTarget.value.toLowerCase() });
  };
  handleSubmit = e => {
    e.preventDefault();

    if (this.state.name.trim() === '') {
      return toast.error('Please, enter query!');
    }
    this.props.searchSubmit(this.state.name);
    this.setState({ name: '' });
  };

  render() {
    return (
      <SearchbarForm onSubmit={this.handleSubmit}>
        <Form>
          <ButtonForm type="submit">
            <HiSearch />
            <ButtonLabel>Search</ButtonLabel>
          </ButtonForm>
          <InputForm
            value={this.state.name}
            onChange={this.handleNameChange}
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </Form>
      </SearchbarForm>
    );
  }
}

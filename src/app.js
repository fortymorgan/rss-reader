import $ from 'jquery';
import render from './render';
import isInputValid from './validator';
import { getFeedsList, toLocalStorage } from './storage';
import modalCallback from './modal';

export default () => {
  const state = {
    feedsList: getFeedsList(),
    validInput: false,
  };

  const input = document.querySelector('input');
  const button = document.querySelector('button');

  input.addEventListener('input', () => {
    state.validInput = isInputValid(input.value, state.feedsList);

    if (state.validInput || input.value === '') {
      input.classList.remove('is-invalid');
      button.disabled = false;
    } else {
      input.classList.add('is-invalid');
      button.disabled = true;
    }
  });

  button.addEventListener('click', (event) => {
    event.preventDefault();
    if (state.validInput) {
      state.feedsList.push(input.value);
      toLocalStorage(state.feedsList);
      render(state.feedsList);
    }
  });

  $('#modal').on('show.bs.modal', modalCallback);

  render(state.feedsList);
};

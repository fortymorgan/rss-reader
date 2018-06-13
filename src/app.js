import $ from 'jquery';
import render from './render';
import isInputValid from './validator';
import { toLocalStorage } from './storage';
import modalCallback from './modal';
import { state } from './state';
import update from './updater';

export default () => {
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
      state.feedsList.push({ url: input.value });
      toLocalStorage('feeds', state.feedsList);
      button.disabled = true;
      render();
    }
  });

  $('#modal').on('show.bs.modal', modalCallback);

  render();
  setInterval(() => update(), 5000);
};

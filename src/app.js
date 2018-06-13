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

  const previousState = {
    feedsList: [],
  };

  const input = document.querySelector('input');
  const button = document.querySelector('button');

  const renderOnState = () => {
    const feedsToRender = state.feedsList
      .filter(feed => !previousState.feedsList.includes(feed));
    render(feedsToRender);
    previousState.feedsList = [...state.feedsList];
  };

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
      toLocalStorage('feeds', state.feedsList);
      button.disabled = true;
      renderOnState();
    }
  });

  $('#modal').on('show.bs.modal', modalCallback);

  renderOnState();
};

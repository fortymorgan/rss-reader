import $ from 'jquery';
import render from './render';
import isInputValid from './validator';
import { getFeedsList, toLocalStorage } from './storage';
import modalCallback from './modal';

export default () => {
  const feedsList = getFeedsList();

  const input = document.querySelector('input');

  input.addEventListener('input', () => {
    if (!isInputValid(input.value, feedsList)) {
      input.style.boxShadow = '0 0 2px 2px #f00';
    } else {
      input.style.boxShadow = '';
    }
  });

  const button = document.querySelector('button');

  button.addEventListener('click', (event) => {
    event.preventDefault();
    if (isInputValid(input.value, feedsList)) {
      feedsList.push(input.value);
      toLocalStorage(feedsList);
      render(feedsList);
    }
  });

  $('#modal').on('show.bs.modal', modalCallback);

  render(feedsList);
};

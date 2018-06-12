import render from './render';
import isInputValid from './validator';

export default () => {
  const feedsList = window.localStorage.getItem('feeds') ?
    JSON.parse(window.localStorage.getItem('feeds')) : [];

  const input = document.querySelector('input');

  const toLocalStorage = () => {
    const jsonString = JSON.stringify(feedsList);
    window.localStorage.setItem('feeds', jsonString);
  };

  input.addEventListener('input', () => {
    if (!isInputValid(input.value) || feedsList.includes(input.value)) {
      input.style.boxShadow = '0 0 2px 2px #f00';
    } else {
      input.style.boxShadow = '';
    }
  });

  const button = document.querySelector('button');

  button.addEventListener('click', (event) => {
    event.preventDefault();
    if (isInputValid(input.value)) {
      feedsList.push(input.value);
      toLocalStorage();
      input.value = '';
      render(feedsList);
    }
  });

  render(feedsList);
};

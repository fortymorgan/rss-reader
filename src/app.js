import $ from 'jquery';
import updateState from './stateUpdater';
import isInputValid from './validator';
import modalCallback from './modal';
import { getFeedsList } from './storage';
import update from './feedsUpdater';

export default () => {
  const state = {
    feedsList: getFeedsList(),
    validInput: false,
    rendered: {
      feeds: [],
      items: [],
    },
    toRender: {
      feeds: getFeedsList(),
      items: [],
    },
  };

  const input = document.querySelector('input');
  const button = document.querySelector('button');

  const toggleInputStyle = {
    valid: () => {
      input.classList.remove('is-invalid');
      button.disabled = false;
    },
    invalid: () => {
      input.classList.add('is-invalid');
      button.disabled = true;
    },
  };

  input.addEventListener('input', () => {
    state.validInput = isInputValid(state);

    if (state.validInput || input.value === '') {
      toggleInputStyle.valid();
    } else {
      toggleInputStyle.invalid();
    }
  });

  button.addEventListener('click', (event) => {
    event.preventDefault();
    if (state.validInput) {
      button.disabled = true;
      updateState(state);
    }
  });

  $('#modal').on('show.bs.modal', modalCallback);

  updateState(state);
  setTimeout(() => update(state), 5000);
};

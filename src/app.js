import $ from 'jquery';
import updateState from './stateUpdater';
import isInputValid from './validator';
import { getFeedsList } from './storage';
import updateFeeds from './feedsUpdater';

function modalCallback(event) {
  const modal = $('#modal');
  const button = $(event.relatedTarget);
  const link = button.prev();
  const title = link.children()[0].innerText;
  const description = link.children()[1].innerText;
  modal.find('.modal-title').text(title);
  modal.find('.modal-body').text(description);
}

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
    toRenderClear: {
      feeds: () => {
        state.toRender.feeds = [];
      },
      items: () => {
        state.toRender.items = [];
      },
    },
    feedsListClear: () => {
      state.feedsList = [];
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

  const exampleLink = document.querySelector('.example');
  exampleLink.addEventListener('click', (event) => {
    event.preventDefault();
    input.value = exampleLink.href;
    state.validInput = true;
    toggleInputStyle.valid();
  });

  $('[data-toggle="tooltip"]').tooltip();

  $('#modal').on('show.bs.modal', modalCallback);

  updateState(state);
  setTimeout(() => updateFeeds(state), 5000);
};

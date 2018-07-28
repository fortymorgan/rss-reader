import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import _ from 'lodash';
import { toLocalStorage } from '../storage';
import * as actions from '../actions';

const feedsList = handleActions({
  [actions.addToFeedsList](state, { payload: { url, id, title } }) {
    const newState = { ...state, [id]: { url, id, title } };
    toLocalStorage('feeds', newState);
    return newState;
  },
  [actions.updateFeedsList](state, { payload: { id, lastUpdate } }) {
    const newState = { ...state, [id]: { ...state[id], lastUpdate } };
    toLocalStorage('feeds', newState);
    return newState;
  },
  [actions.removeFeed](state, { payload: { id } }) {
    const newState = _.omit(state, id);
    toLocalStorage('feeds', newState);
    return newState;
  },
}, {});

const input = handleActions({
  [actions.changeInput](state, { payload: { text } }) {
    return text;
  },
  [actions.addToFeedsList]() {
    return '';
  },
}, '');

const validInput = handleActions({
  [actions.validateInput]() {
    return true;
  },
  [actions.rejectInput]() {
    return false;
  },
}, false);

const itemsList = handleActions({
  [actions.addToItems](state, { payload: { items, feedId } }) {
    return [...items.map(item => ({ ...item, feedId })), ...state];
  },
  [actions.addNewItems](state, { payload: { items, feedId } }) {
    const renderedItems = state.map(item => item.link);
    return [...items
      .filter(item => !renderedItems.includes(item.link))
      .map(item => ({ ...item, feedId })),
    ...state];
  },
  [actions.removeFeed](state, { payload: { id } }) {
    return state.filter(item => item.feedId !== id);
  },
}, []);

const errors = handleActions({
  [actions.checkError](state, { payload: { url } }) {
    return [...state, url];
  },
  [actions.deleteError](state, { payload: { url } }) {
    return state.filter(error => error !== url);
  },
}, []);

const nextId = handleActions({
  [actions.updateNextId](state, { payload: { id } }) {
    return id + 1;
  },
}, 0);

// const renderedFeeds = handleActions({
//   [actions.checkRenderedFeed](state, { payload: { feed } }) {
//     return [...state, feed];
//   },
// }, []);

// const renderedItems = handleActions({
//   [actions.checkRenderedItems](state, { payload: { items } }) {
//     return [...state, ...items];
//   },
// }, []);

// const feedsToRender = handleActions({
//   [actions.addFeedsToRender](state, { payload: { feeds } }) {
//     return [...state, ...feeds];
//   },
//   [actions.checkRenderedFeed](state, { payload: { feed } }) {
//     return state.filter(item => item !== feed);
//   },
// }, []);

// const itemsToRender = handleActions({
//   [actions.addItemsToRender](state, { payload: { items } }) {
//     return [...state, items];
//   },
//   [actions.checkRenderedItems]() {
//     return [];
//   },
// }, []);

export default combineReducers({
  feedsList,
  validInput,
  input,
  itemsList,
  errors,
  nextId,
  // renderedFeeds,
  // renderedItems,
  // feedsToRender,
  // itemsToRender,
});

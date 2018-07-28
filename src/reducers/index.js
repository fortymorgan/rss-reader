import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { toLocalStorage } from '../storage';
import * as actions from '../actions';

const feedsList = handleActions({
  [actions.addToFeedsList](state, { payload: { url } }) {
    const newState = [...state, { url }];
    toLocalStorage('feeds', newState);
    return newState;
  },
  [actions.updateFeedsList](state, { payload: { url, lastUpdate } }) {
    const newState = state.map(feed => (feed.url === url ? { ...feed, lastUpdate } : feed));
    toLocalStorage('feeds', newState);
    return newState;
  },
}, []);

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
  [actions.addToItems](state, { payload: { items } }) {
    return [...items, ...state];
  },
  [actions.addNewItems](state, { payload: { items } }) {
    const renderedItems = state.map(item => item.url);
    return [...items.filter(item => !renderedItems.includes(item.url)), state];
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
  // renderedFeeds,
  // renderedItems,
  // feedsToRender,
  // itemsToRender,
});

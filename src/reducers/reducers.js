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
  [actions.updateFeedsList](state, { payload: { list } }) {
    toLocalStorage('feeds', list);
    return list;
  },
}, []);

const validInput = handleActions({
  [actions.validateInput]() {
    return true;
  },
  [actions.rejectInput]() {
    return false;
  },
}, false);

const errors = handleActions({
  [actions.checkError](state, { payload: { url } }) {
    return [...state, url];
  },
  [actions.clearErrors]() {
    return [];
  },
}, []);

const renderedFeeds = handleActions({
  [actions.checkRenderedFeed](state, { payload: { feed } }) {
    return [...state, feed];
  },
}, []);

const renderedItems = handleActions({
  [actions.checkRenderedItems](state, { payload: { items } }) {
    return [...state, ...items];
  },
}, []);

const feedsToRender = handleActions({
  [actions.addFeedsToRender](state, { payload: { feeds } }) {
    return [...state, ...feeds];
  },
  [actions.checkRenderedFeed](state, { payload: { feed } }) {
    return state.filter(item => item !== feed);
  },
}, []);

const itemsToRender = handleActions({
  [actions.addItemsToRender](state, { payload: { items } }) {
    return [...state, items];
  },
  [actions.checkRenderedItems]() {
    return [];
  },
}, []);

export default combineReducers({
  feedsList,
  validInput,
  errors,
  renderedFeeds,
  renderedItems,
  feedsToRender,
  itemsToRender,
});

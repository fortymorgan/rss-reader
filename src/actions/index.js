import { createAction } from 'redux-actions';
import getRssData from '../getter';

export const addToFeedsList = createAction('FEEDS_LIST_ADD', url => ({ url }));
export const updateFeedsList = createAction('FEEDS_LIST_UPDATE', (url, lastUpdate) => ({ url, lastUpdate }));
export const checkError = createAction('ERROR_CHECK', url => ({ url }));
export const deleteError = createAction('ERROR_DELETE', url => ({ url }));
export const changeInput = createAction('INPUT_CHANGE', text => ({ text }));
export const addToItems = createAction('ITEMS_ADD', items => ({ items }));
export const addNewItems = createAction('NEW_ITEMS_ADD', items => ({ items }));
// export const addFeedsToRender = createAction('FEED_TO_RENDER_ADD', feeds => ({ feeds }));
// export const clearErrors = createAction('ERRORS_CLEAR');
// export const checkRenderedFeed = createAction('RENDERED_FEED_CHECK', feed => ({ feed }));
// export const checkRenderedItems = createAction('RENDERED_ITEMS_CHECK', items => ({ items }));
// export const addItemsToRender = createAction('ITEMS_TO_RENDER_ADD', items => ({ items }));
export const validateInput = createAction('INPUT_VALIDATE');
export const rejectInput = createAction('INPUT_REJECT');

export const addNewFeed = feed => async (dispatch) => {
  try {
    dispatch(addToFeedsList(feed));
    const { itemsData } = await getRssData(feed);
    dispatch(addToItems(itemsData));
  } catch (e) {
    dispatch(checkError(feed));
  }
};

export const downloadOnStart = feedsList => async (dispatch) => {
  feedsList.forEach(async ({ url }) => {
    dispatch(addToFeedsList(url));
    try {
      const { itemsData } = await getRssData(url);
      dispatch(addToItems(itemsData));
    } catch (e) {
      dispatch(checkError(url));
    }
  });
};

export const updateFeeds = store => async (dispatch) => {
  const { feedsList } = store.getState();
  feedsList.forEach(async (feed) => {
    try {
      const { itemsData, lastUpdate } = await getRssData(feed.url);
      if (!feed.lastUpdate) {
        dispatch(updateFeedsList(feed.url, lastUpdate));
      } else if (new Date(feed.lastUpdate) < lastUpdate) {
        dispatch(updateFeedsList(feed.url, lastUpdate));
        dispatch(addNewItems(itemsData));
      }
    } catch (e) {
      dispatch(checkError(feed.url));
    }
  });
  setTimeout(() => dispatch(updateFeeds(store)), 5000);
};

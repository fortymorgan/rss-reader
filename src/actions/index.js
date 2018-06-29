import { createAction } from 'redux-actions';

export const addToFeedsList = createAction('FEEDS_LIST_ADD', url => ({ url }));
export const addFeedsToRender = createAction('FEED_TO_RENDER_ADD', feeds => ({ feeds }));
export const updateFeedsList = createAction('FEEDS_LIST_UPDATE', list => ({ list }));
export const checkError = createAction('ERROR_CHECK', url => ({ url }));
export const clearErrors = createAction('ERRORS_CLEAR');
export const checkRenderedFeed = createAction('RENDERED_FEED_CHECK', feed => ({ feed }));
export const checkRenderedItems = createAction('RENDERED_ITEMS_CHECK', items => ({ items }));
export const addItemsToRender = createAction('ITEMS_TO_RENDER_ADD', items => ({ items }));
export const validateInput = createAction('INPUT_VALIDATE');
export const rejectInput = createAction('INPUT_REJECT');

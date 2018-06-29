import getRssData from './getter';
import * as actions from './actions';
import { renderFeeds, renderErrors } from './render';

export default (store) => {
  const input = document.querySelector('input');

  if (store.getState().validInput) {
    store.dispatch(actions.addToFeedsList(input.value));
    store.dispatch(actions.addFeedsToRender([{ url: input.value }]));
  }

  store.getState().feedsToRender.forEach((feed) => {
    getRssData(feed)
      .then(({ itemsData }) => {
        store.dispatch(actions.addItemsToRender(itemsData));
        renderFeeds(itemsData);
        store.dispatch(actions.checkRenderedItems(itemsData));
      })
      .catch(() => {
        store.dispatch(actions.checkError(feed));
        const { errors } = store.getState();
        renderErrors(errors);
        store.dispatch(actions.clearErrors());
      });
    store.dispatch(actions.checkRenderedFeed(feed));
  });
};

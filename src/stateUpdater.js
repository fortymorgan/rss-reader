import { renderFeeds, renderErrors } from './render';
import getRssData from './getter';

export default (state) => {
  const input = document.querySelector('input');

  if (state.validInput) {
    state.addToFeedsList(input.value);
    state.addFeedToRender(input.value);
  }

  state.toRender.feeds.forEach((feed) => {
    getRssData(feed)
      .then(({ itemsData }) => {
        state.addItemsToRender(itemsData);
        renderFeeds(state);
        state.checkRenderedItems();
      })
      .catch(() => {
        state.checkError(feed.url);
        renderErrors(state);
        state.clearErrors();
      });
    state.checkRenderedFeed(feed);
  });

  state.clearFeedsToRender();
};

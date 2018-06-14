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
        state.addItemsFromFeed(itemsData);
      })
      .catch(() => {
        state.checkError(feed);
      });
    state.checkRenderedFeed(feed);
  });

  state.clearFeedsToRender();
};

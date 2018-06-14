import getRssData from './getter';

const updateFeeds = (state) => {
  const feedsWithDate = [];
  state.feedsList.forEach((feed) => {
    getRssData(feed)
      .then(({ itemsData, lastUpdate }) => {
        if (feed.lastUpdate && new Date(feed.lastUpdate) < lastUpdate) {
          const newItems = state.getNewItems(itemsData);
          state.addItemsFromUpdate(newItems);
        }

        feedsWithDate.push({ url: feed.url, lastUpdate });
        if (feedsWithDate.length === state.feedsList.length) {
          state.updateFeedsList(feedsWithDate);
          setTimeout(() => updateFeeds(state), 5000);
        }
      })
      .catch(() => setTimeout(() => updateFeeds(state), 5000));
  });
};

export default updateFeeds;

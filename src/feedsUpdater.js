import getRssData from './getter';
import * as actions from './actions';
import { renderUpdates } from './render';

const updateFeeds = (store) => {
  const feedsWithDate = [];
  const state = store.getState();
  state.feedsList.forEach((feed) => {
    getRssData(feed)
      .then(({ itemsData, lastUpdate }) => {
        if (feed.lastUpdate && new Date(feed.lastUpdate) < lastUpdate) {
          const { renderedItems } = store.getState();
          const renderedTitles = renderedItems.map(renderedItem => renderedItem.title);
          const newItems = itemsData.filter(item => !renderedTitles.includes(item.title));
          store.dispatch(actions.addItemsToRender(newItems));
          renderUpdates(newItems);
          store.dispatch(actions.checkRenderedItems(newItems));
        }

        feedsWithDate.push({ url: feed.url, lastUpdate });
        if (feedsWithDate.length === state.feedsList.length) {
          store.dispatch(actions.updateFeedsList(feedsWithDate));
          setTimeout(() => updateFeeds(store), 5000);
        }
      })
      .catch(() => setTimeout(() => updateFeeds(store), 5000));
  });
};

export default updateFeeds;

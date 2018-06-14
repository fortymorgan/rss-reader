import getRssData from './getter';
import { renderUpdates } from './render';

const update = (state) => {
  const feedsWithDate = [];
  state.feedsList.forEach((feed) => {
    getRssData(feed)
      .then(({ itemsData, lastUpdate }) => {
        if (feed.lastUpdate && new Date(feed.lastUpdate) < lastUpdate) {
          const renderedTitles = state.rendered.items.map(renderedItem => renderedItem.title);
          const newItems = itemsData.filter(item => !renderedTitles.includes(item.title));
          state.addItemsToRender(newItems);
          renderUpdates(state);
          state.checkRenderedItems();
        }
        feedsWithDate.push({ url: feed.url, lastUpdate });
      }).then(() => {
        if (feedsWithDate.length === state.feedsList.length) {
          state.updateFeedsList(feedsWithDate);
          setTimeout(() => update(state), 5000);
        }
      })
      .catch(() => setTimeout(() => update(state), 5000));
  });
};

export default update;

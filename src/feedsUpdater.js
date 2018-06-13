import state from './state';
import { toLocalStorage } from './storage';
import getRssData from './getter';
import renderUpdated from './renderUpdated';

const update = () => {
  const feedsWithDate = [];
  state.feedsList.forEach((feed) => {
    getRssData(feed)
      .then(({ itemsData, lastUpdate }) => {
        if (feed.lastUpdate && new Date(feed.lastUpdate) < lastUpdate) {
          const renderedTitles = state.rendered.items.map(renderedItem => renderedItem.title);
          const newItems = itemsData.filter(item => !renderedTitles.includes(item.title));
          state.toRender.items.push(...newItems);
          renderUpdated();
          state.rendered.items.push(...state.toRender.items);
        }
        state.toRender.items = [];
        feedsWithDate.push({ url: feed.url, lastUpdate });
      }).then(() => {
        if (feedsWithDate.length === state.feedsList.length) {
          state.feedsList = feedsWithDate;
          toLocalStorage('feeds', state.feedsList);
          setTimeout(() => update(), 5000);
        }
      })
      .catch(() => setTimeout(() => update(), 5000));
  });
};

export default update;

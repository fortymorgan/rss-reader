import { toLocalStorage } from './storage';
import getRssData from './getter';
import renderUpdated from './renderUpdated';

const update = (state) => {
  const feedsWithDate = [];
  state.feedsList.forEach((feed) => {
    getRssData(feed)
      .then(({ itemsData, lastUpdate }) => {
        if (feed.lastUpdate && new Date(feed.lastUpdate) < lastUpdate) {
          const renderedTitles = state.rendered.items.map(renderedItem => renderedItem.title);
          const newItems = itemsData.filter(item => !renderedTitles.includes(item.title));
          state.toRender.items.push(...newItems);
          renderUpdated(state);
          state.rendered.items.push(...state.toRender.items);
        }
        state.toRender.items.splice(0);
        feedsWithDate.push({ url: feed.url, lastUpdate });
      }).then(() => {
        if (feedsWithDate.length === state.feedsList.length) {
          state.feedsList.splice(0);
          state.feedsList.push(...feedsWithDate);
          toLocalStorage('feeds', state.feedsList);
          setTimeout(() => update(state), 5000);
        }
      })
      .catch(() => setTimeout(() => update(state), 5000));
  });
};

export default update;

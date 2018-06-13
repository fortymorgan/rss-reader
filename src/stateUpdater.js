import render from './renderFeeds';
import state from './state';
import getRssData from './getter';
import { toLocalStorage } from './storage';

export default (newFeeds) => {
  state.feedsList.push(...newFeeds);
  toLocalStorage('feeds', state.feedsList);

  state.toRender.feeds.push(...newFeeds);
  state.toRender.feeds.forEach((feed) => {
    getRssData(feed)
      .then(({ itemsData }) => {
        state.toRender.items.push(...itemsData);
        render();
      }).then(() => {
        state.rendered.items.push(...state.toRender.items);
        state.toRender.items = [];
      });
    state.rendered.feeds.push(feed);
  });

  state.toRender.feeds = [];
};

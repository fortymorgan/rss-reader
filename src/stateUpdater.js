import render from './renderFeeds';
import getRssData from './getter';
import { toLocalStorage } from './storage';

export default (state) => {
  const input = document.querySelector('input');

  if (state.validInput) {
    state.feedsList.push({ url: input.value });
    toLocalStorage('feeds', state.feedsList);

    state.toRender.feeds.push({ url: input.value });
  }

  state.toRender.feeds.forEach((feed) => {
    getRssData(feed)
      .then(({ itemsData }) => {
        state.toRender.items.push(...itemsData);
        render(state);
        state.rendered.items.push(...state.toRender.items);
        state.toRender.items.splice(0);
      });
    state.rendered.feeds.push(feed);
  });

  state.toRender.feeds.splice(0);
};

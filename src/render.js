import getRssData from './getter';
import clearErrorsAndInput from './cleaner';
import { state, renderedState } from './state';

const render = (feedsList) => {
  clearErrorsAndInput();

  const button = document.querySelector('button');

  const listGroup = document.querySelector('.list-group');

  feedsList.forEach((feed) => {
    getRssData(feed).then((feedData) => {
      feedData.forEach(({ description, link, title }) => {
        renderedState.headers.push(title);
        const html = `<li class="list-group-item">
          <a href="${link}" class="list-group-item-action flex-column align-items-start" target="_blank">
            <h5 class="mb-1">${title}</h5>
            <p class="mb-1">${description}</p>
          </a>
          <button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#modal">More...</button>
        </li>`;
        listGroup.innerHTML += html;
      });
      button.disabled = false;
    });
  });
};

export default () => {
  const feedsToRender = state.feedsList
    .filter(feed => !renderedState.feedsList.map(item => item.url).includes(feed.url));
  render(feedsToRender);
  renderedState.feedsList = [...state.feedsList];
};

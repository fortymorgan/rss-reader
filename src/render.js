import getRssData from './getter';
import clearErrorsAndInput from './cleaner';
import { state, renderedState } from './state';

const render = (feedsList) => {
  clearErrorsAndInput();

  const button = document.querySelector('button');

  const listGroup = document.querySelector('.list-group');

  feedsList.forEach((feed) => {
    getRssData(feed).then((feedData) => {
      const htmlListItems = feedData.map(({ description, link, title }) => {
        const html = `<div>
          <a href="${link}" class="list-group-item list-group-item-action flex-column align-items-start" target="_blank">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">${title}</h5>
            </div>
            <p class="mb-1">${description}</p>
          </a>
          <button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#modal">More...</button>
        </div>`;
        return html;
      }).join('');
      listGroup.innerHTML += htmlListItems;
      button.disabled = false;
    });
  });
};

export default () => {
  const feedsToRender = state.feedsList
    .filter(feed => !renderedState.feedsList.includes(feed));
  render(feedsToRender);
  renderedState.feedsList = [...state.feedsList];
};

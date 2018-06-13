import { renderedState } from './state';

export default (feedItems) => {
  const listGroup = document.querySelector('.list-group');

  const newItems = feedItems.filter(item => !renderedState.headers.includes(item.title));
  newItems.forEach(({ description, link, title }) => {
    const div = document.createElement('div');
    div.innerHTML = `<a href="${link}" class="list-group-item list-group-item-action flex-column align-items-start" target="_blank">
      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">${title}</h5>
      </div>
      <p class="mb-1">${description}</p>
    </a>
    <button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#modal">More...</button>`;
    listGroup.prepend(div);
    renderedState.headers.push(title);
  });
};

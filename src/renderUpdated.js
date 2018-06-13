import { renderedState } from './state';

export default (feedItems) => {
  const listGroup = document.querySelector('.list-group');

  const newItems = feedItems.filter(item => !renderedState.headers.includes(item.title));
  newItems.forEach(({ description, link, title }) => {
    const listItem = document.createElement('li');
    listItem.classList.add('list-group-item');
    listItem.innerHTML = `<a href="${link}" class="list-group-item-action flex-column align-items-start" target="_blank">
      <h5 class="mb-1">${title}</h5>
      <p class="mb-1">${description}</p>
    </a>
    <button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#modal">More...</button>`;
    listGroup.prepend(listItem);
    renderedState.headers.push(title);
  });
};

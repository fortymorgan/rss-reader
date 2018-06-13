import clearErrorsAndInput from './cleaner';
import state from './state';

export default () => {
  clearErrorsAndInput();

  const button = document.querySelector('button');

  const listGroup = document.querySelector('.list-group');

  state.toRender.items.forEach(({ description, link, title }) => {
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
};

import clearErrorsAndInput from './cleaner';
import generateItemHtml from './itemGenarator';

export default (state) => {
  clearErrorsAndInput();

  const button = document.querySelector('button');

  const listGroup = document.querySelector('.list-group');

  state.toRender.items.forEach((item) => {
    const html = `<li class="list-group-item">${generateItemHtml(item)}</li>`;
    listGroup.innerHTML += html;
  });
  button.disabled = false;
};

import state from './state';
import generateItemHtml from './itemGenarator';

export default () => {
  const listGroup = document.querySelector('.list-group');

  state.toRender.items.forEach((item) => {
    const listItem = document.createElement('li');
    listItem.classList.add('list-group-item');
    listItem.innerHTML = generateItemHtml(item);
    listGroup.prepend(listItem);
  });
};

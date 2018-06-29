const generateItemHtml = ({ description, link, title }) => `<a href="${link}" class="list-group-item-action flex-column align-items-start" target="_blank">
  <h5 class="mb-1">${title}</h5>
  <p class="mb-1">${description}</p>
</a>
<button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#modal">More...</button>`;

const clearErrorsAndInput = () => {
  const input = document.querySelector('input');
  input.value = '';

  const errors = document.querySelectorAll('.alert');
  errors.forEach(error => error.remove());
};

const render = (items, addChildAction) => {
  const listGroup = document.querySelector('.list-group');

  items.forEach((item) => {
    const listItem = document.createElement('li');
    listItem.classList.add('list-group-item');
    listItem.innerHTML = generateItemHtml(item);
    listGroup[addChildAction](listItem);
  });
};

export const renderFeeds = (items) => {
  clearErrorsAndInput();

  const button = document.querySelector('button');

  render(items, 'append');

  button.disabled = false;
};

export const renderUpdates = (items) => {
  render(items, 'prepend');
};

export const renderErrors = (errors) => {
  errors.forEach((error) => {
    const errorMessage = document.createElement('div');
    errorMessage.setAttribute('class', 'alert alert-danger alert-dismissible fade show');
    errorMessage.setAttribute('role', 'alert');
    errorMessage.innerHTML = `Error while downloading ${error.url}
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>`;

    const listGroup = document.querySelector('.list-group');
    listGroup.before(errorMessage);
  });
};

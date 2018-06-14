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


export const renderFeeds = (state) => {
  clearErrorsAndInput();

  const button = document.querySelector('button');

  const listGroup = document.querySelector('.list-group');

  state.toRender.items.forEach((item) => {
    const html = `<li class="list-group-item">${generateItemHtml(item)}</li>`;
    listGroup.innerHTML += html;
  });
  button.disabled = false;
};

export const renderUpdates = (state) => {
  const listGroup = document.querySelector('.list-group');

  state.toRender.items.forEach((item) => {
    const listItem = document.createElement('li');
    listItem.classList.add('list-group-item');
    listItem.innerHTML = generateItemHtml(item);
    listGroup.prepend(listItem);
  });
};

export const renderErrors = (state) => {
  state.errors.forEach((error) => {
    const errorMessage = document.createElement('div');
    errorMessage.setAttribute('class', 'alert alert-danger alert-dismissible fade show');
    errorMessage.setAttribute('role', 'alert');
    errorMessage.innerHTML = `Error while downloading ${error}
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>`;

    const listGroup = document.querySelector('.list-group');
    listGroup.before(errorMessage);
  });
};

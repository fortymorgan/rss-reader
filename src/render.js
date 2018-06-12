import getRssData from './getter';

const resetList = () => {
  const input = document.querySelector('input');
  input.value = '';

  const listGroup = document.querySelector('.list-group');
  if (listGroup) {
    listGroup.remove();
  }
};

export default (feedsList) => {
  resetList();
  const listGroup = document.createElement('div');
  listGroup.classList.add('list-group');

  feedsList.forEach((feed) => {
    getRssData(feed).then((dataArray) => {
      const htmlListItems = dataArray.map(({ description, link, title }) => {
        const html = `<div>
          <a href="${link}" class="list-group-item list-group-item-action flex-column align-items-start">
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
    });
  });

  document.body.append(listGroup);
};

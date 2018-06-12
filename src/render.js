import getRssData from './getter';

export default (feedsList) => {
  const listGroup = document.createElement('div');
  listGroup.classList.add('list-group');

  feedsList.forEach((feed) => {
    getRssData(feed).then((dataArray) => {
      const htmlListItems = dataArray.map(({ description, link, title }) => {
        const html = `<a href="${link}" class="list-group-item list-group-item-action flex-column align-items-start">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">${title}</h5>
          </div>
          <p class="mb-1">${description}</p>
        </a>`;
        return html;
      }).join('');
      listGroup.innerHTML += htmlListItems;
    });
  });

  document.body.append(listGroup);
};

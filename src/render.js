import getRssData from './getter';
import clearErrorsAndInput from './cleaner';

export default (feedsList) => {
  clearErrorsAndInput();

  const button = document.querySelector('button');

  const listGroup = document.querySelector('.list-group');

  feedsList.forEach((feed) => {
    getRssData(feed).then((dataArray) => {
      const htmlListItems = dataArray.map(({ description, link, title }) => {
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

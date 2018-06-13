import axios from 'axios';
import parseRssXml from './parser';

const corsProxy = 'https://cors-anywhere.herokuapp.com/';

export default feed => axios.get(corsProxy + feed.url)
  .then(blob => blob.data)
  .then((data) => {
    const parser = new DOMParser();
    const xml = parser.parseFromString(data, 'application/xml');
    return parseRssXml(xml);
  }).catch(() => {
    const errorMessage = document.createElement('div');
    errorMessage.setAttribute('class', 'alert alert-danger alert-dismissible fade show');
    errorMessage.setAttribute('role', 'alert');
    errorMessage.innerHTML = `Error while downloading ${feed.url}
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>`;

    const listGroup = document.querySelector('.list-group');
    listGroup.before(errorMessage);
  });

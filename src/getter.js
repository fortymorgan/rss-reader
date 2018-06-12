import axios from 'axios';
import parseRssXml from './parser';

const corsProxy = 'https://cors-anywhere.herokuapp.com/';

export default feed => axios.get(corsProxy + feed)
  .then(blob => blob.data)
  .then((data) => {
    const parser = new DOMParser();
    const xml = parser.parseFromString(data, 'application/xml');
    return parseRssXml(xml);
  }).catch(() => {
    const errorMessage = document.createElement('div');
    errorMessage.setAttribute('class', 'alert alert-danger');
    errorMessage.setAttribute('role', 'alert');
    errorMessage.textContent = `Error while downloading ${feed}`;

    const jumbotron = document.querySelector('.jumbotron');
    jumbotron.after(errorMessage);
  });

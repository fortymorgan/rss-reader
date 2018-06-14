import axios from 'axios';
import parseRssXml from './parser';

const corsProxy = 'https://cors-anywhere.herokuapp.com/';

export default feed => axios.get(corsProxy + feed.url)
  .then(blob => blob.data)
  .then((data) => {
    const parser = new DOMParser();
    const xml = parser.parseFromString(data, 'application/xml');
    return parseRssXml(xml);
  });

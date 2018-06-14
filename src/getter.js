import axios from 'axios';
import parseRssXml from './parser';

const corsProxy = 'https://cors-proxy.htmldriven.com/?url=';

export default feed => axios.get(corsProxy + feed.url)
  .then(blob => blob.data)
  .then((data) => {
    const parser = new DOMParser();
    const xml = parser.parseFromString(data.body, 'application/xml');
    return parseRssXml(xml);
  });

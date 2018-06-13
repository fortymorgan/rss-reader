import axios from 'axios';
import { state } from './state';
import { toLocalStorage } from './storage';
import parseRssXml from './parser';

const corsProxy = 'https://cors-anywhere.herokuapp.com/';

export default () => {
  const feedsWithDate = [];
  state.feedsList.forEach((feed) => {
    axios.get(corsProxy + feed.url)
      .then(blob => blob.data)
      .then((data) => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(data, 'application/xml');
        const { lastUpdate } = parseRssXml(xml);
        feedsWithDate.push({ url: feed.url, lastUpdate });
      }).then(() => {
        state.feedsList = feedsWithDate;
        toLocalStorage('feeds', state.feedsList);
      });
  });
};

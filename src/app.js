import axios from 'axios';
import isURL from 'validator/lib/isURL';

const input = document.querySelector('input');

const isInputValid = string => isURL(string, { require_protocol: true });

const feedsList = window.localStorage.getItem('feeds') ?
  JSON.parse(window.localStorage.getItem('feeds')) : [];

const toLocalStorage = () => {
  const jsonString = JSON.stringify(feedsList);
  window.localStorage.setItem('feeds', jsonString);
};

input.addEventListener('input', () => {
  if (!isInputValid(input.value)) {
    input.style.boxShadow = '0 0 2px 2px #f00';
  } else {
    input.style.boxShadow = '';
  }
});

const button = document.querySelector('button');

button.addEventListener('click', (event) => {
  event.preventDefault();
  if (isInputValid(input.value)) {
    feedsList.push(input.value);
    toLocalStorage();
  }
});

const parseRssXml = (xml) => {
  const items = [...xml.querySelectorAll('item')];
  const itemsData = items.map((item) => {
    const title = item.querySelector('title').textContent;
    const descriptionElement = item.querySelector('description');
    const description = descriptionElement ? descriptionElement.textContent : '';
    const link = item.querySelector('link').innerHTML;
    return { title, description, link };
  });
  console.log(itemsData);
};

export default () => {
  axios.get('https://cors-anywhere.herokuapp.com/http://rss.cnn.com/rss/edition.rss')
    .then(blob => blob.data)
    .then((data) => {
      const parser = new DOMParser();
      const xml = parser.parseFromString(data, 'application/xml');
      parseRssXml(xml);
    })
    .catch(err => console.log(err));
};

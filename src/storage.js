export const getFeedsList = () => (window.localStorage.getItem('feeds') ?
  JSON.parse(window.localStorage.getItem('feeds')) : []);

export const toLocalStorage = (key, data) => {
  const jsonString = JSON.stringify(data);
  window.localStorage.setItem(key, jsonString);
};

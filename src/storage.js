export const getFeedsList = () => (window.localStorage.getItem('feeds') ?
  JSON.parse(window.localStorage.getItem('feeds')) : []);

export const toLocalStorage = (feedsList) => {
  const jsonString = JSON.stringify(feedsList);
  window.localStorage.setItem('feeds', jsonString);
};

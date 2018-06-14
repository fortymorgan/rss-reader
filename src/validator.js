import isURL from 'validator/lib/isURL';

export default (state) => {
  const input = document.querySelector('input');

  return isURL(input.value, { require_protocol: true }) &&
  !state.feedsList.map(item => item.url).includes(input.value);
};

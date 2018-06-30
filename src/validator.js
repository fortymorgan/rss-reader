import isURL from 'validator/lib/isURL';

export default (input, feedsList) => isURL(input, { require_protocol: true }) &&
  !feedsList.map(item => item.url).includes(input);

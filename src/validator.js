import isURL from 'validator/lib/isURL';

export default (string, storage) =>
  (isURL(string, { require_protocol: true }) && !storage.map(item => item.url).includes(string));

import isURL from 'validator/lib/isURL';
import { state } from './state';

export default string =>
  (isURL(string, { require_protocol: true }) &&
  !state.feedsList.map(item => item.url).includes(string));

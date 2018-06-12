import isURL from 'validator/lib/isURL';

export default string => isURL(string, { require_protocol: true });

import { compact, set } from 'lodash';

export default (url: string) => {
  const params = {};
  const arr = compact(url.split('?'));
  if (arr.length <= 1) {
    return params;
  }
  const search = arr[1].split('&');
  for (let i = 0, l = search.length; i < l; i += 1) {
    const key = search[i].split('=');
    set(params, key[0], key[1]);
  }
  return params;
};

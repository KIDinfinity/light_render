import lodash from 'lodash';
import whiteList from './whiteList.config';

export default (keys?: string[]) => {
  if (lodash.isArray(keys)) {
    keys.forEach((key) => {
      sessionStorage.removeItem(key);
      localStorage.removeItem(key);
    });

    return;
  }

  const lskeys = Object.keys(localStorage);
  const sskeys = Object.keys(sessionStorage);
  lskeys
    .filter((key: string) => !whiteList.ls.includes(key))
    .forEach((key: string) => {
      localStorage.removeItem(key);
    });
  sskeys
    .filter((key: string) => !whiteList.ss.includes(key))
    .forEach((key: string) => {
      sessionStorage.removeItem(key);
    });
};

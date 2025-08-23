import lodash from 'lodash';

export default ({ data, blackList }: any) => {
  return lodash.filter(data, (item) => {
    return !lodash.includes(blackList, item.key);
  });
};

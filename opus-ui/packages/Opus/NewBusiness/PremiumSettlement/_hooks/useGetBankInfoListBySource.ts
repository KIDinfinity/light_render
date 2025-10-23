import lodash from 'lodash';

export default ({ bankList, source, filter }: any) => {
  return lodash
    .chain(bankList)
    .filter((bankItem: any) => {
      if (filter) {
        return filter(bankItem.source);
      } else {
        return lodash.includes([source], bankItem.source);
      }
    })
    .value();
};

import lodash from 'lodash';

export default (data: any) => {
  return lodash
    .chain(data?.options || [])
    .map((el: any) => ({
      dictCode: el?.value,

      dictName: el?.label?.en,
    }))
    .value();
};

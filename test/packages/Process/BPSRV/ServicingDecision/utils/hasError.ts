import lodash from 'lodash';

export default (obj: any) =>
  lodash
    .chain(obj)
    .values()
    .some((item: any) => item?.errors)
    .value();

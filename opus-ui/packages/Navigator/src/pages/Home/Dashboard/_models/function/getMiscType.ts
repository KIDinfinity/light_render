import { reduce } from 'lodash';

export default (miscTypeList: any[]) =>
  reduce(
    miscTypeList,
    (misc: any, item: any) => ({
      ...misc,
      [item.fieldName]: item.miscType,
    }),
    {}
  );

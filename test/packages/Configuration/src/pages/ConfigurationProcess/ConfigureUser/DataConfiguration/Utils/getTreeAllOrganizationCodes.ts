import lodash from 'lodash';
import * as  FlattenJS from 'flattenjs';

const ParentFind = (code: any, list: any, codeList: any): any => {
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of Object.entries(list)) {

    if (value === code && /\.organizationCode/.test(key)) {

      const parentKey = lodash.replace(key, 'organizationCode', 'parentOrganizationCode');
      const parentValue = list[parentKey];
      codeList.unshift(code);
      return ParentFind(parentValue, list, codeList);
    }
    if (value === code && !/\.organizationCode/.test(key)) {
      return codeList;
    }
  }
};

export default (values: any, cascaderDatas: any) => {
  const dataMap = FlattenJS.convert(cascaderDatas);
  const result = ParentFind(lodash.last(values), dataMap, []);
  return result;
};

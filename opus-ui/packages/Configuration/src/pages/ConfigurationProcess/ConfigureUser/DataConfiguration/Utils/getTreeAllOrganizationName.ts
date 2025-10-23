import lodash from 'lodash';

const childFind = (values: any, list: any, level: number, nameList: any): any => {
  const { length } = values;
  if (level > length) return nameList;
  const current = lodash.find(list, (item: any) => item?.organizationCode === values[level - 1]);
  if (current) {
    if (current?.children && lodash.size(current?.children)) {
      nameList.push(current?.organizationName);
      return childFind(values, current?.children, level + 1, nameList);
    }
    nameList.push(current?.organizationName);
    return nameList;
  }
  return nameList;
};

export default (values: any, cascaderDatas: any) => {
  return childFind(values, cascaderDatas, 1, []);
};

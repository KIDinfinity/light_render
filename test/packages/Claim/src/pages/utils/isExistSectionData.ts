import lodash from 'lodash';

export function isExistSectionData(sectionList: any, listMap: any, targetList: any) {
  return lodash.some(sectionList, (id) => {
    return !lodash.isEmpty(listMap[id][targetList]);
  });
}
export default isExistSectionData;

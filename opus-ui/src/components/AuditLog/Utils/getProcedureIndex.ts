import lodash from 'lodash';
const handleOpTreatmentList = (list) => {
  if (!lodash.isArray(list)) {
    return 0;
  } else {
    return lodash.unionBy(list, 'group').length;
  }
};
const handleOpTreatmentListSelf = (list, curPath) => {
  //TODO:uniqByGroup,再把group和当前的返回
  if (!lodash.isArray(list) || !lodash.isString(curPath)) {
    return 0;
  } else {
    const curIndex = Number(curPath?.match(/\w+\[(\d+)\]/)?.[1]);
    const curGroup = list?.[curIndex]?.group;
    const simpleList = lodash.uniqBy(list, 'group');
    const finalIndex = simpleList?.findIndex((item) => item?.group === curGroup);
    return finalIndex >= 0 ? finalIndex : 0;
  }
};
const needHandleListLengthMap = {
  //opTreatmentList每次添加一个日期都会添加一个item，但是这个不能算作一个index
  opTreatmentList: handleOpTreatmentList,
  opTreatmentListSelf: handleOpTreatmentListSelf,
};

export default ({ newClaimData, frontList, pathArray, sectionIndex, targetPath }) => {
  //TODO:拿到frontList里面所有list的length和（pathArray去掉最后一个在newClaimData中查找frontList里面的list），再加上sectionIndex
  if (
    !newClaimData ||
    !lodash.isArray(frontList) ||
    !lodash.isArray(pathArray) ||
    !lodash.isNumber(sectionIndex) ||
    !targetPath
  ) {
    return -1;
  }
  let targetPathArray = lodash.cloneDeep(pathArray);
  const lastPath = targetPath.slice(targetPath.lastIndexOf('.') + 1);
  const arrayIndexFlag = targetPathArray.findIndex((item) => {
    return item.includes(lastPath);
  });

  //当前配置isSortByOtherList的path在pathArray中不存在
  if (arrayIndexFlag < 0) {
    return -1;
  }

  targetPathArray = targetPathArray.slice(0, arrayIndexFlag);

  //当frontList的length=1&&lastPath就是这个唯一元素时表示需要根据自己特殊处理
  if (
    frontList?.length === 1 &&
    frontList?.[0] === lastPath &&
    lodash.isFunction(needHandleListLengthMap[lastPath + 'Self'])
  ) {
    const opList = lodash.get(newClaimData, `${targetPathArray?.join('.')}.${lastPath}`, null);
    const curPath = pathArray[pathArray.length - 1];
    return needHandleListLengthMap[lastPath + 'Self'](opList, curPath);
  }

  const targetObj = lodash.get(newClaimData, targetPathArray?.join('.'), null);
  if (!lodash.isPlainObject(targetObj)) {
    return -1;
  }
  let finalIndex = 0;
  frontList.forEach((item) => {
    if (lodash.isArray(targetObj[item])) {
      if (needHandleListLengthMap[item] && lodash.isFunction(needHandleListLengthMap[item])) {
        finalIndex += needHandleListLengthMap[item](targetObj[item]);
      } else {
        finalIndex += targetObj[item]?.length;
      }
    }
  });
  finalIndex = finalIndex >= 0 ? finalIndex + sectionIndex : sectionIndex;
  return finalIndex;
};

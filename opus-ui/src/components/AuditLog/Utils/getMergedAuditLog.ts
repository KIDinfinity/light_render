import lodash from 'lodash';
const handleMergeList = ({
  needMergedChangedFieldList,
  list,
  currentController,
  oldClaimData,
  newClaimData,
}) => {
  const handleFieldList = needMergedChangedFieldList.filter((ele) => {
    return list.find((item) => {
      const simplifyPath = item?.path?.replace(/\[\d+\]/g, '');
      return ele.fieldName === item.fieldName && ele.path === simplifyPath;
    });
  });
  let tempList = lodash.cloneDeep(list);
  handleFieldList.forEach((item) => {
    if (lodash.isFunction(item?.mergeFunc)) {
      tempList = item?.mergeFunc({
        needMergedChangedFieldList,
        list: tempList,
        currentController,
        oldClaimData,
        newClaimData,
      });
    }
  });
  return tempList;
};

export default handleMergeList;

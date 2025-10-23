import lodash from 'lodash';
import diffResponsePostHandler from './diffResponsePostHandler.ts';
//TODO:去重条件：fieldName、value完全一致，path包含关系
export default (list: object[], currentController, oldClaimData, newClaimData) => {
  let curList = lodash.cloneDeep(list);
  //针对两条log的oldValue是""和null，重复log的情况
  curList = curList.map((item) => {
    if (item.oldValue) {
      return item;
    }
    if (lodash.isNull(item.oldValue)) {
      item.oldValue = '';
    }
    return item;
  });
  //针对fieldName、newValue、label、section一样的去重
  curList = lodash.uniqBy(
    curList,
    (item) => `${item.fieldName}_${item.newValue}_${item.oldValue}_${item.label}_${item.section}`
  );
  const finalList = curList.filter((item) => {
    return !curList.some((ele) => {
      const fieldNameFlag = ele?.fieldName === item?.fieldName;
      const labelFlag = ele?.label === item?.label;
      const valueFlag = ele?.newValue === item?.newValue;
      const pathFlag =
        ele?.path?.includes(item?.path) &&
        ele?.path?.length > item?.path?.length &&
        !item?.path.startsWith('clientInfoList');
      return (fieldNameFlag || labelFlag) && valueFlag && pathFlag;
    });
  });
  return diffResponsePostHandler(finalList, currentController, oldClaimData, newClaimData);
};

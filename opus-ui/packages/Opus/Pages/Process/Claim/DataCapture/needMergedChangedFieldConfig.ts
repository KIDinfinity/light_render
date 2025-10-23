import lodash from 'lodash';
import moment from 'moment';
const mergeOutpatientTreatmentDate = ({
  needMergedChangedFieldList,
  list,
  currentController,
  oldClaimData,
  newClaimData,
}) => {
  const tempList = lodash?.cloneDeep(list);
  const notContainList = [];
  const containList = [];
  let finalContainList = [];
  tempList?.forEach((item) => {
    const simplifyPath = item?.path?.replace(/\[\d+\]/g, '');
    const targetItem = needMergedChangedFieldList?.find((ele) => {
      return ele?.fieldName === item?.fieldName && ele?.path === simplifyPath;
    });
    if (!targetItem) {
      notContainList?.push(item);
    } else {
      containList?.push(item);
    }
  });

  let parentPath;
  //需要处理的log，需要拿到里面的group才能判断需要log的procedure
  if (containList?.length > 0) {
    let groupList = [];
    containList?.forEach((item) => {
      parentPath = item?.path?.slice(0, item?.path?.lastIndexOf('['));
      groupList.push({
        logItem: item,
        group:
          lodash.get(oldClaimData, item?.path)?.group ||
          lodash.get(newClaimData, item?.path)?.group,
      });
    });
    //对结果针对group进行去重
    groupList = lodash.uniqBy(groupList, 'group');
    const getTargetLogItem = (item, claimData) => {
      const dataList = [];
      const tempDataList = lodash.get(claimData, parentPath, []);
      tempDataList?.forEach((ele) => {
        if (ele?.group === item?.group) {
          const tempValue = ele?.outpatientTreatmentDate
            ? moment(ele?.outpatientTreatmentDate).format('L')
            : '';
          dataList.push(tempValue);
        }
      });
      return dataList;
    };
    //去重后直接比对newClaimData和oldClaimData，拿到change，放到finalContainList
    groupList?.forEach((item) => {
      const newDataList = getTargetLogItem(item, newClaimData);
      const oldDataList = getTargetLogItem(item, oldClaimData);
      finalContainList.push({
        ...item.logItem,
        ...{
          oldValue: oldDataList.join(','),
          newValue: newDataList.join(','),
        },
      });
    });
    finalContainList = finalContainList?.filter(
      (item) => !(item?.newValue === '' && item?.oldValue === '')
    );
  }
  return [...notContainList, ...finalContainList] || tempList;
};

export default [
  {
    path: 'incidentList.treatmentList.opTreatmentList',
    fieldName: 'outpatientTreatmentDate',
    mergeFunc: mergeOutpatientTreatmentDate,
  },
];

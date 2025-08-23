import { useMemo } from 'react';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';

import { CategoryCode, ApplicationType } from '@/utils/constant/information';

enum operatorFlag {
  A = 'A',
  ALL = 'ALL',
  S = 'S',
}

export default ({}: any) => {
  const {
    currentActivity,
    allCategoryList,
    assignee,
    userId,
    caseStatus,
    taskStatus,
    commonAuthorityList = [],
    currentTaskStatus,
    addInformations,
    allCategoryHistory,
  } = useSelector(
    (state: any) => ({
      informationData: state?.navigatorInformationController?.informationData,
      currentActivity: state?.navigatorInformationController?.currentActivity,
      allCategoryList: state?.navigatorInformationController?.allCategoryList,
      assignee: state?.navigatorInformationController?.assignee,
      taskStatus: state?.navigatorInformationController?.taskStatus,
      caseStatus: state?.navigatorInformationController?.caseStatus,
      addInformations: state?.navigatorInformationController?.addInformations,
      userId: state?.user?.currentUser?.userId,
      commonAuthorityList: state?.authController?.commonAuthorityList,
      currentTaskStatus: state?.processTask?.getTask?.taskStatus,
      allCategoryHistory: state?.navigatorInformationController?.allCategoryHistory,
    }),
    shallowEqual
  );
  const status =
    taskStatus === currentTaskStatus && currentTaskStatus ? taskStatus : currentTaskStatus;

  const variableCategorys = useMemo(() => {
    const limitJsonList = commonAuthorityList.filter(
      (item: any) => item.authorityCode === 'infoCategory' && item.type === 'infoCategory'
    );

    const addInfos = lodash.groupBy(addInformations, 'categoryCode');
    const historyCategorys = lodash.groupBy(allCategoryHistory, 'categoryCode');

    const categorys = lodash
      .get(currentActivity, 'activityCategoryList', [])
      .filter(
        (item: any) =>
          item.applicationType !== CategoryCode.all && item.applicationType === ApplicationType.Both
      )
      .filter((item: any) => {
        if (item.operatorFlag === operatorFlag.A && assignee !== userId) {
          return false;
        }
        if (item.operatorFlag === operatorFlag.S) {
          return !lodash.isEmpty(
            limitJsonList.filter((authItem: any) => {
              return (
                authItem.limitJson.categoryCode === item.categoryCode &&
                (lodash.isEmpty(caseStatus)
                  ? status === authItem.limitJson.activityStatus
                  : caseStatus === authItem.limitJson.caseStatus)
              );
            })
          );
        }

        return true;
      })
      .reduce((res, i) => {
        // 同一个categoryCode，已添加的info + 已发出的info >= maxNo， 用户不能选categoryCode
        const exsitingCount =
          addInfos[i.categoryCode]?.length || 0 + historyCategorys[i.categoryCode]?.length || 0;

        res[i.categoryCode] = {
          disabled: lodash.isFinite(i.maxNo) ? exsitingCount >= i.maxNo : false,
          categoryCode: i.categoryCode,
        };
        return res;
      }, {});

    const resultData = lodash
      .filter(allCategoryList, (item) => categorys[item.dictCode])
      .map((i) => ({ ...i, disabled: categorys[i.dictCode]?.disabled }));

    return resultData;
  }, [
    addInformations,
    allCategoryHistory,
    currentActivity,
    allCategoryList,
    assignee,
    userId,
    caseStatus,
    status,
  ]);

  return variableCategorys;
};

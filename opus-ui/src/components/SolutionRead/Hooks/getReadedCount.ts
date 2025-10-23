import { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { EModule, ESubjectType } from '../Enums';
import { NAMESPACE } from '../activity.config';

export default ({ module }: any) => {
  const allCategoryHistory =
    useSelector((state: any) => state.navigatorInformationController?.allCategoryHistory) || [];

  const historyReasonGroups =
    useSelector((state: any) => state.envoyController?.historyReasonGroups) || [];

  const readData =
    useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.readData, shallowEqual) ||
    {};
  const isAssinee =
    useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.isAssinee, shallowEqual) ||
    false;

  return useMemo(() => {
    switch (module) {
      case EModule.INFORMATION:
        if (!isAssinee) {
          return 0;
        }
        return lodash
          .chain(allCategoryHistory)
          .reduce((count: any, { informationList = [] }: any) => {
            let newCount = count;
            informationList.forEach(({ informationDOList = [] }: any) => {
              informationDOList.forEach((doItem: any) => {
                if (!lodash.includes(readData[ESubjectType.INFORMATION], doItem.id)) {
                  newCount = newCount + 1;
                }
              });
            });
            return newCount;
          }, 0)
          .value();

        break;

      case EModule.ENVOY:
        // TODO:需要计算当前的memo未读数量
        if (!isAssinee) {
          return 0;
        }
        return lodash
          .chain(historyReasonGroups)
          .reduce((count: any, item: any) => {
            if (!lodash.includes(readData[ESubjectType.ENVOY], item.id)) {
              return Number(count) + 1;
            }
            return count;
          }, 0)
          .value();

        break;

      default:
        break;
    }
    return 0;
  }, [allCategoryHistory, historyReasonGroups, readData, module]);
};

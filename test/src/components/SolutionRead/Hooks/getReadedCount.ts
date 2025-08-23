import { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';

import CallStatus from 'integration/Enum/CallStatus';
import { taskStatus } from 'bpm/enum';

import { EModule, ESubjectType } from '../Enums';
import { NAMESPACE } from '../activity.config';

export default ({ module, taskId }: any) => {
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

  const integrationChecklist = useSelector(
    (state: any) => state.integration?.integrationChecklist,
    shallowEqual
  );

  const count = useMemo(() => {
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
            if (!lodash.includes(readData[ESubjectType.ENVOY], item.id) && item.isVisible !== 'N') {
              return Number(count) + 1;
            }
            return count;
          }, 0)
          .value();

        break;

      case EModule.Integration:
        if (lodash.size(integrationChecklist) === 0) {
          return 0;
        }
        //有接口报错就需要有红点
        if (lodash.isArray(integrationChecklist)) {
          const countItem = lodash
            .chain(integrationChecklist)
            .map('integrationCallRecordList')
            ?.flatten()
            ?.find(
              (item) =>
                item?.callStatus === CallStatus.fail || item?.callStatus === CallStatus.retry
            )
            .value();
          if (countItem) {
            return 1;
          }
        }

        if (!taskId) {
          const tempItem = integrationChecklist?.[0];
          if (
            lodash.includes(
              [taskStatus.todo, taskStatus.pending, taskStatus.rejected],
              tempItem.taskStatus
            ) &&
            lodash.some(
              tempItem.integrationCallRecordList,
              (item) =>
                item?.callStatus === CallStatus.fail || item?.callStatus === CallStatus.retry
            )
          ) {
            return 1;
          }
        }

        const task = lodash.find(
          integrationChecklist,
          (item) =>
            lodash.size(item.integrationCallRecordList) > 0 &&
            (item.taskId === taskId ||
              (item.taskId !== taskId && item.taskStatus !== taskStatus.skip))
        );
        if (task) {
          return lodash.some(
            task.integrationCallRecordList,
            (item) => item?.callStatus === CallStatus.fail || item?.callStatus === CallStatus.retry
          )
            ? 1
            : 0;
        }

        return 0;
      default:
        break;
    }
    return 0;
  }, [allCategoryHistory, historyReasonGroups, readData, module, integrationChecklist, taskId]);

  const dot = count > 0 && module === EModule.Integration;
  return { count, dot };
};

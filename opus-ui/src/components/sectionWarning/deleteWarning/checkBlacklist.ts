import lodash, { toUpper } from 'lodash';
import { getDvaApp } from 'umi';

enum blackListEnum {
  ALL = 'ALL',
}

export default (sectionId: string, triggerPoint: string) => {
  // eslint-disable-next-line
  const {
    caseCategory,
    taskDefKey: activityKey,
  } = getDvaApp()?._store?.getState()?.processTask?.getTask;
  // eslint-disable-next-line
  const blackList = getDvaApp()?._store?.getState()?.global?.blackList;
  const isBlacklist = lodash.some(blackList, (item) => {
    return (
      lodash.includes([toUpper(caseCategory), blackListEnum.ALL], toUpper(item.caseCategory)) &&
      lodash.includes([toUpper(activityKey), blackListEnum.ALL], toUpper(item.activityKey)) &&
      lodash.includes([toUpper(triggerPoint), blackListEnum.ALL], toUpper(item.triggerPoint)) &&
      lodash.includes([toUpper(sectionId), blackListEnum.ALL], toUpper(item.sectionId))
    );
  });
  return isBlacklist;
};

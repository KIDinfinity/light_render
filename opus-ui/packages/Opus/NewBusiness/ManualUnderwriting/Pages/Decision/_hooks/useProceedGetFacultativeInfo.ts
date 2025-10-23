import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import TaskDefKey from 'basic/enum/TaskDefKey';
import CaseCategory from 'basic/enum/CaseCategory';
import { useMemo } from 'react';

export default () => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const { caseCategory, activityKey } = useSelector(
    ({ processTask }: any) => processTask.getTask ?? {},
    shallowEqual
  );

  const isManualUwCase =
    caseCategory === CaseCategory.BP_NB_CTG001 && activityKey === TaskDefKey.BP_NB_ACT004;
  const isAppealCase =
    caseCategory === CaseCategory.BP_AP_CTG02 && activityKey === TaskDefKey.BP_AP_ACT003;

  return useMemo(
    () => (isManualUwCase || isAppealCase) && editable,
    [isManualUwCase, isAppealCase, editable]
  );
};

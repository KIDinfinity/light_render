import TaskDefKey from 'basic/enum/TaskDefKey';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';

export default ({ sectionId, editable, policyStatus, editModalProps }: any): boolean => {
  const taskDetail = useSelector(
    ({ [NAMESPACE]: modelNamespace }: any) => modelNamespace.taskDetail,
    shallowEqual
  );

  if (taskDetail?.activityKey === TaskDefKey.BP_NB_ACT008) {
    return false;
  }

  return editable;
};

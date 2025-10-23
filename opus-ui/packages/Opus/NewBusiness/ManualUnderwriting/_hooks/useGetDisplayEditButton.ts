import TaskDefKey from 'basic/enum/TaskDefKey';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import { getAuth } from '@/auth/Utils';

export default ({ sectionId, editable, policyStatus, editModalProps }: any): boolean => {
  const taskDetail = useSelector(
    ({ [NAMESPACE]: modelNamespace }: any) => modelNamespace.taskDetail,
    shallowEqual
  );
  const currentUserId = useSelector(
    ({ user: currentUserInfo }: any) => currentUserInfo?.currentUser?.userId
  );
  const commonAuthorityList = useSelector((state: any) => state.authController.commonAuthorityList);
  const editAuth = !getAuth(commonAuthorityList, { authorityCode: 'RS_BP_Button_ProposalChange_NonEdit' });

  if (taskDetail?.activityKey === TaskDefKey.BP_NB_ACT008) {
    if (
      sectionId === 'ClientInformation' &&
      policyStatus == 'IF' &&
      taskDetail.assignee === currentUserId
    ) {
      return editAuth;
    }
  } else if (!!editable && !!editModalProps?.children) {
    return editAuth;
  }

  return false;
};

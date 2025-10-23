import { assignedPermission } from '@/services/rbac2PermissionLimitControllerService';
import { Category, CategoryType } from '../../Constant';
import { CheckPermission, ShowAuthError } from '../../Utils';

const { assignSelf, assignOthers, beAssigned, assignOtherstoSelf } = Category;
// (1) assignSelf  当前任务assigne是自己，但是没有assginSelf权限
// (2) assignOthers 当前任务assigne不是自己，但是没有assginOther权限
// (3) beAssigned 无权限时报错
// (4) assignOhterstoSelf 把别人的任务拖到自己

export default function* ({ payload }: any, { call }: any) {
  const {
    assignee, // assign给谁
    assigner: currentUser, // 当前用户
    taskId,
    taskUser, // 任务的所有者
    caseCategory,
    caseNo,
    skipEditLogCheck = false,
  } = payload;
  // 首页无taskUser，全部taskUser = assigner
  const taskOwner = taskUser || currentUser;

  const response = yield call(assignedPermission, {
    categoryCodeList: CategoryType.AssignTask,
    taskLimitData: {
      taskId,
      caseCategory,
      caseNo,
    },
    userId: assignee,
    skipEditLogCheck,
  });

  if (response && response.success) {
    const [
      assignSelfData,
      assignOthersData,
      beAssignedData,
      assignOtherstoSelfData,
    ] = CheckPermission(
      [assignSelf, assignOthers, beAssigned, assignOtherstoSelf],
      response?.resultData
    );

    // assign自己的任务给别人
    const isCanNotAssignSelf =
      taskOwner === currentUser && assignSelfData && !assignSelfData.result;
    // assign别人的任务给别人
    const isCanNotAssignOthers =
      taskOwner !== currentUser &&
      assignee !== currentUser &&
      assignOthersData &&
      !assignOthersData.result;
    // 被别人assign任务
    const isCanNotBeAssigned = beAssignedData && !beAssignedData.result;
    // assign别人的任务给自己
    const isCanNotAssignOhterstoSelf =
      taskOwner !== currentUser &&
      assignee === currentUser &&
      assignOtherstoSelfData &&
      !assignOtherstoSelfData.result;

    if (isCanNotAssignSelf) {
      ShowAuthError(assignSelfData);
      return false;
    }
    if (isCanNotAssignOthers) {
      ShowAuthError(assignOthersData);
      return false;
    }
    if (isCanNotBeAssigned) {
      ShowAuthError(beAssignedData);
      return false;
    }
    if (isCanNotAssignOhterstoSelf) {
      ShowAuthError(assignOtherstoSelfData);
      return false;
    }
    return true;
  }

  // ShowErrors(response && response.promptMessages);
  return false;
}

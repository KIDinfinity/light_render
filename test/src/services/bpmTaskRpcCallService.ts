
import request from '@/utils/request';

export async function listFormerCase(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/listFormerCase', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function hasPendingForFactConfirmation(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/pendCategory/hasPendingForFactConfirmation', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function autoUnPend(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/task/autoUnPend', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function checkTask(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/task/checkTask', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function completeTask(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/task/completeTask', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findAssigneeByProcInstId(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/task/findAssigneeByProcInstId', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findByBusinessNoAndCastCategory(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/task/findByBusinessNoAndCastCategory', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findLatesTaskByCaseNo(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/task/findLatesTaskByCaseNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findLatesTaskByInquiryBusinessNo(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/task/findLatesTaskByInquiryBusinessNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findLatesTaskByProcessInstId(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/task/findLatesTaskByProcessInstId', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findTaskCountByUserAndStatus(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/task/findTaskCountByUserAndStatus', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findTaskLinkedUserByUserIdList(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/task/findTaskLinkedUserByUserIdList', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findTaskListByProcInstId(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/task/findTaskListByProcInstId', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findUserIdByTaskId(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/task/findUserIdByTaskId', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getActivityEarliestCompleteTime(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/task/getActivityEarliestCompleteTime', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getActivityStatusByProcInstId(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/task/getActivityStatusByProcInstId', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getActivityStatusByTaskId(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/task/getActivityStatusByTaskId', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getActivityTaskList(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/task/getActivityTaskList', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getButtonList(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/task/getButtonList', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getCurrentAssigneeByBusinessNo(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/task/getCurrentAssigneeByBusinessNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getCurrentTaskByCaseNo(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/task/getCurrentTaskByCaseNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getCurrentTaskByTaskId(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/task/getCurrentTaskByTaskId', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getCurrentTaskIdByBusinessNo(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/task/getCurrentTaskIdByBusinessNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getCurrentTaskIdByCaseNo(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/task/getCurrentTaskIdByCaseNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getCurrentTaskSlaByCaseNo(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/task/getCurrentTaskSlaByCaseNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getLastAssigneeOfSameActivity(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/task/getLastAssigneeOfSameActivity', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getLastAssigneeOfSameActivityByBusinessNo(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/task/getLastAssigneeOfSameActivityByBusinessNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getLatestAssigneeByCaseNo(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/task/getLatestAssigneeByCaseNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getRegisterTask(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/task/getRegisterTask', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getTask(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/task/getTask', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getTaskAssigneeByTaskId(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/task/getTaskAssigneeByTaskId', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getTaskDetailByBusinessNos(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/task/getTaskDetailByBusinessNos', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function listIntegratedPendInfo(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/task/listIntegratedPendInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function listLatestTasksByBusinessNo(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/task/listLatestTasksByBusinessNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function listRunningTaskDetails(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/task/listRunningTaskDetails', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function listTaskByClaimNos(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/task/listTaskByClaimNos', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function listTaskByPolicyNo(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/task/listTaskByPolicyNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function listTasksByCaseNoList(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/task/listTasksByCaseNoList', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function listUsersWithCurrentTaskAmount(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/task/listUsersWithCurrentTaskAmount', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function listUsersWithTotalTaskAmount(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/task/listUsersWithTotalTaskAmount', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function lsActivitySLA(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/task/lsActivitySLA', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function pagePendInfo(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/task/pagePendInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function pendTask(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/task/pendTask', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function resumeTask(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/task/resumeTask', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function resumeTaskWithActionType(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/task/resumeTaskWithActionType', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function sendPending(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/task/sendPending', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function submitQCPermissionValidation(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/task/submitQCPermissionValidation', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function syncCompleteTask(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/task/syncCompleteTask', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function testTriggerInquiryBusiness(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/task/testTriggerInquiryBusiness', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function updateAssessmentType(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/task/updateAssessmentType', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function validateSubmission(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/task/validateSubmission', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  listFormerCase,
  hasPendingForFactConfirmation,
  autoUnPend,
  checkTask,
  completeTask,
  findAssigneeByProcInstId,
  findByBusinessNoAndCastCategory,
  findLatesTaskByCaseNo,
  findLatesTaskByInquiryBusinessNo,
  findLatesTaskByProcessInstId,
  findTaskCountByUserAndStatus,
  findTaskLinkedUserByUserIdList,
  findTaskListByProcInstId,
  findUserIdByTaskId,
  getActivityEarliestCompleteTime,
  getActivityStatusByProcInstId,
  getActivityStatusByTaskId,
  getActivityTaskList,
  getButtonList,
  getCurrentAssigneeByBusinessNo,
  getCurrentTaskByCaseNo,
  getCurrentTaskByTaskId,
  getCurrentTaskIdByBusinessNo,
  getCurrentTaskIdByCaseNo,
  getCurrentTaskSlaByCaseNo,
  getLastAssigneeOfSameActivity,
  getLastAssigneeOfSameActivityByBusinessNo,
  getLatestAssigneeByCaseNo,
  getRegisterTask,
  getTask,
  getTaskAssigneeByTaskId,
  getTaskDetailByBusinessNos,
  listIntegratedPendInfo,
  listLatestTasksByBusinessNo,
  listRunningTaskDetails,
  listTaskByClaimNos,
  listTaskByPolicyNo,
  listTasksByCaseNoList,
  listUsersWithCurrentTaskAmount,
  listUsersWithTotalTaskAmount,
  lsActivitySLA,
  pagePendInfo,
  pendTask,
  resumeTask,
  resumeTaskWithActionType,
  sendPending,
  submitQCPermissionValidation,
  syncCompleteTask,
  testTriggerInquiryBusiness,
  updateAssessmentType,
  validateSubmission,
}

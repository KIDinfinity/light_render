import request from '@/utils/request';

export async function checkSnapshot(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/process/task/checkSnapshot', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getCurrentTaskIdByBusinessNo(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/process/task/getCurrentTaskIdByBusinessNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function assignTask(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/task/assignTask', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function batchAssignTask(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/task/batchAssignTask', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function batchAssignTaskV2(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/task/batchAssignTaskV2', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function checkAddInfoPermission(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/task/checkAddInfoPermission', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function claimTask(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/task/claimTask', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function completeTask(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/task/completeTask', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function countTaskByActivity(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/task/countTaskByActivity', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function countTaskByStatus(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/task/countTaskByStatus', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function deleteTask(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/task/deleteTask', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findAutoActivityTask(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/task/findAutoActivityTask', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findHistoryTask(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/task/findHistoryTask', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findLatesTaskByCaseNo(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/task/findLatesTaskByCaseNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findSystemTaskByTaskId(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/task/findSystemTaskByTaskId', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getButtonList(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/task/getButtonList', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getDefaultActivityCode(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/task/getDefaultActivityCode', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getErrorTasks(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/task/getErrorTasks', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getOverDueTasks(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/task/getOverDueTasks', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getSubmissionId(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/task/getSubmissionId', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getTask(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/task/getTask', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getTaskByBusinessNo(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/task/getTaskByBusinessNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function listAssigneesTaskNum(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/task/listAssigneesTaskNum', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function listAssigneesQuery(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/task/listAssigneesQuery', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function listCompletedTasks(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/task/listCompletedTasks', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function listPrioritizedTaskDetails(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/task/listPrioritizedTaskDetails', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function listTasks(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/task/listTasks', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function listTasksHist(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/task/listTasksHist', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function listTasksHistByTaskId(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/task/listTasksHistByTaskId', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function loadActivityCategory(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/task/loadActivityCategory', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function lsActivitySLA(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/task/lsActivitySLA', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function lsTaskSLA(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/task/lsTaskSLA', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getLastTask(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/task/task/getLastTask', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function validateSubmission(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/task/validateSubmission', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  checkSnapshot,
  getCurrentTaskIdByBusinessNo,
  assignTask,
  batchAssignTask,
  checkAddInfoPermission,
  claimTask,
  completeTask,
  countTaskByActivity,
  countTaskByStatus,
  deleteTask,
  findAutoActivityTask,
  findHistoryTask,
  findLatesTaskByCaseNo,
  findSystemTaskByTaskId,
  getButtonList,
  getDefaultActivityCode,
  getErrorTasks,
  getOverDueTasks,
  getSubmissionId,
  getTask,
  getTaskByBusinessNo,
  listAssigneesTaskNum,
  listAssigneesQuery,
  listCompletedTasks,
  listPrioritizedTaskDetails,
  listTasks,
  listTasksHist,
  listTasksHistByTaskId,
  loadActivityCategory,
  lsActivitySLA,
  lsTaskSLA,
  getLastTask,
  validateSubmission,
  batchAssignTaskV2,
};

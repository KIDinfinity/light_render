
import request from '@/utils/request';

export async function getActHiTaskInstInfo(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/case/getActHiTaskInstInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getClaimNoByInquiryClaimNo(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/claim/getClaimNoByInquiryClaimNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getDocumentListForWool(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/document/getDocumentListForWool', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function queryByClaimNo(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/mongodb/queryByClaimNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findAllOrg(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/organization/findAllOrg', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getHospitalBatchTasks(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/relationship/getHospitalBatchTasks', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findAATaskInOneCase(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/task/findAATaskInOneCase', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function listTaskByClaimNos(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/task/listTaskByClaimNos', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function listTaskByPolicyNo(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/task/listTaskByPolicyNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function queryByBusinessNo(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/transaction/queryByBusinessNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findAllUsers(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/user/findAllUsers', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getActHiTaskInstInfo,
  getClaimNoByInquiryClaimNo,
  getDocumentListForWool,
  queryByClaimNo,
  findAllOrg,
  getHospitalBatchTasks,
  findAATaskInOneCase,
  listTaskByClaimNos,
  listTaskByPolicyNo,
  queryByBusinessNo,
  findAllUsers,
}

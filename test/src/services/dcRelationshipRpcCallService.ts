
import request from '@/utils/request';

export async function filteringExistRelationship(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/relationship/filteringExistRelationship', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findCaseRelaitonshipAndTaskDetail(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/relationship/findCaseRelaitonshipAndTaskDetail', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findProcessRelationship(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/relationship/findProcessRelationship', {
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

export default {
  filteringExistRelationship,
  findCaseRelaitonshipAndTaskDetail,
  findProcessRelationship,
  getHospitalBatchTasks,
}

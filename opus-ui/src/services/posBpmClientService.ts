
import { stringify } from 'qs';
import request from '@/utils/request';

export async function saveInformation(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/info/saveInformation', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findBusinessDataByCaseNo(params?: any, option?: any): Promise<any> {
  return request(`/rpc/bpm/pos/bizProcess/findBusinessDataByCaseNo?${stringify(params)}`, {
    ...option,
  });
}

export async function saveCaseRelationship(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/relationship/saveCaseRelationship', {
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

export default {
  saveInformation,
  findBusinessDataByCaseNo,
  saveCaseRelationship,
  findAssigneeByProcInstId,
}


import request from '@/utils/request';

export async function findByProcInstIdList(params?: any, option?: any): Promise<any> {
  return request('/rpc/dw/caseMgnt/findByProcInstIdList', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getCaseByCaseNos(params?: any, option?: any): Promise<any> {
  return request('/rpc/dw/caseMgnt/getCaseByCaseNos', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getCaseByLinkedCase(params?: any, option?: any): Promise<any> {
  return request('/rpc/dw/caseMgnt/getCaseByLinkedCase', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getCaseByRelationship(params?: any, option?: any): Promise<any> {
  return request('/rpc/dw/caseMgnt/getCaseByRelationship', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function listAllConfigByRegion(params?: any, option?: any): Promise<any> {
  return request('/rpc/dw/caseMgnt/listAllConfigByRegion', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function listByCaseNo(params?: any, option?: any): Promise<any> {
  return request('/rpc/dw/caseMgnt/listByCaseNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function listByOverviewRelationship(params?: any, option?: any): Promise<any> {
  return request('/rpc/dw/caseMgnt/listByOverviewRelationship', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  findByProcInstIdList,
  getCaseByCaseNos,
  getCaseByLinkedCase,
  getCaseByRelationship,
  listAllConfigByRegion,
  listByCaseNo,
  listByOverviewRelationship,
}

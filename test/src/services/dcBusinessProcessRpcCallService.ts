
import request from '@/utils/request';

export async function getBusinessProcess(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/businessProcess/getBusinessProcess', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getCaseDetail(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/businessProcess/getCaseDetail', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getInformationIntegrateParam(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/businessProcess/getInformationIntegrateParam', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getBusinessProcess,
  getCaseDetail,
  getInformationIntegrateParam,
}

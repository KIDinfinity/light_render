
import request from '@/utils/request';

export async function findBizProcess(params?: any, option?: any): Promise<any> {
  return request('/api/case/mgnt/bizProcess/bizProcess/findBizProcess', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getCaseDetail(params?: any, option?: any): Promise<any> {
  return request('/api/case/mgnt/bizProcess/bizProcess/getCaseDetail', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  findBizProcess,
  getCaseDetail,
}

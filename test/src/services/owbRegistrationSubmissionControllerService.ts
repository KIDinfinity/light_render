
import request from '@/utils/request';

export async function findDocRelCustomerInf(params?: any, option?: any): Promise<any> {
  return request('/api/registration/submission/findDocRelCustomerInf', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getCaseRelevantSubmissionBatchInfo(params?: any, option?: any): Promise<any> {
  return request('/api/registration/submission/getCaseRelevantSubmissionBatchInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getCaseCategoryCompanyMap(params?: any, option?: any): Promise<any> {
  return request('/api/registration/submission/getCaseCategoryCompanyMap', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  findDocRelCustomerInf,
  getCaseRelevantSubmissionBatchInfo,
  getCaseCategoryCompanyMap,
}

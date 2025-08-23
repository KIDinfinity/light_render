import request from '@/utils/request';
import { stringify } from 'qs';

export async function historyTransaction(params?: any, option?: any): Promise<any> {
  return request(`/api/monitor/center/historyTransaction`, {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function latest(params?: any, option?: any): Promise<any> {
  return request(`/api/monitor/center/latest?${stringify(params)}`, {
    ...option,
  });
}

export async function centerRequest(params?: any, option?: any): Promise<any> {
  return request('/api/monitor/center/request', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function centerExport(params?: any, option?: any): Promise<any> {
  return request('/api/monitor/center/export', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function centerProductionMonitor(params?: any, option?: any): Promise<any> {
  return request('/api/monitor/center/productionMonitor', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function retryTriggerPost(params?: any, option?: any): Promise<any> {
  return request('/api/navigator/remote/service/record/retryTriggerPostQC', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function handleCase(params?: any, option?: any): Promise<any> {
  return request('/api/navigator/special/handleCase', {
    ...option,
    method: 'POST',
    body: params,
  });
}
export async function markPass(params?: any, option?: any): Promise<any> {
  return request('/api/navigator/skipBOError/markPass', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  history,
  latest,
  centerRequest,
  retryTriggerPost,
  handleCase,
  centerExport,
  markPass,
};

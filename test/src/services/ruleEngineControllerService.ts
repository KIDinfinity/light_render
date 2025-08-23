
import request from '@/utils/request';

export async function buildSpecifiedRule(params?: any, option?: any): Promise<any> {
  return request('/api/ruleEngine/buildSpecifiedRule', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function queryByTraceId(params?: any, option?: any): Promise<any> {
  return request('/api/ruleEngine/queryByTraceId', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function queryLastTrace(params?: any, option?: any): Promise<any> {
  return request('/api/ruleEngine/queryLastTrace', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function reloadKieContainer(params?: any, option?: any): Promise<any> {
  return request('/api/ruleEngine/reloadKieContainer', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function saveRule(params?: any, option?: any): Promise<any> {
  return request('/api/ruleEngine/saveRule', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  buildSpecifiedRule,
  queryByTraceId,
  queryLastTrace,
  reloadKieContainer,
  saveRule,
}

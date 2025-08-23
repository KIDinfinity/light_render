
import request from '@/utils/request';

export async function approveRuleSet(params?: any, option?: any): Promise<any> {
  return request('/api/ruleEngine/approveRuleSet', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function asyncRequestQueryRuleSetByBusinessId(params?: any, option?: any): Promise<any> {
  return request('/api/ruleEngine/asyncRequestQueryRuleSetByBusinessId', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function asyncRequestQueryRuleSetByVersionId(params?: any, option?: any): Promise<any> {
  return request('/api/ruleEngine/asyncRequestQueryRuleSetByVersionId', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function buildRuleSetByVersionId(params?: any, option?: any): Promise<any> {
  return request('/api/ruleEngine/buildRuleSetByVersionId', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getAsyncQueryRuleSetByBusinessIdResult(params?: any, option?: any): Promise<any> {
  return request('/api/ruleEngine/getAsyncQueryRuleSetByBusinessIdResult', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getAsyncQueryRuleSetByVersionIdResult(params?: any, option?: any): Promise<any> {
  return request('/api/ruleEngine/getAsyncQueryRuleSetByVersionIdResult', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function queryRuleSetByBusinessId(params?: any, option?: any): Promise<any> {
  return request('/api/ruleEngine/queryRuleSetByBusinessId', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function queryRuleSetByVersionId(params?: any, option?: any): Promise<any> {
  return request('/api/ruleEngine/queryRuleSetByVersionId', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function rejectRuleSet(params?: any, option?: any): Promise<any> {
  return request('/api/ruleEngine/rejectRuleSet', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function submitRuleSet(params?: any, option?: any): Promise<any> {
  return request('/api/ruleEngine/submitRuleSet', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function validateBasicRule(params?: any, option?: any): Promise<any> {
  return request('/api/ruleEngine/validateBasicRule', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  approveRuleSet,
  asyncRequestQueryRuleSetByBusinessId,
  asyncRequestQueryRuleSetByVersionId,
  buildRuleSetByVersionId,
  getAsyncQueryRuleSetByBusinessIdResult,
  getAsyncQueryRuleSetByVersionIdResult,
  queryRuleSetByBusinessId,
  queryRuleSetByVersionId,
  rejectRuleSet,
  submitRuleSet,
  validateBasicRule,
}


import request from '@/utils/request';

export async function checkPolicyInsured(params?: any, option?: any): Promise<any> {
  return request('/rpc/integration/la/checkPolicyInsured', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function checkPolicyInsuredIsNew(params?: any, option?: any): Promise<any> {
  return request('/rpc/integration/la/checkPolicyInsuredIsNew', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function disableBusinessObjects(params?: any, option?: any): Promise<any> {
  return request('/rpc/integration/la/disableBusinessObjects', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getInsuredInfo(params?: any, option?: any): Promise<any> {
  return request('/rpc/integration/la/getInsuredInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getLaResponseDetail(params?: any, option?: any): Promise<any> {
  return request('/rpc/integration/la/getLaResponseDetail', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function recordBusinessObject(params?: any, option?: any): Promise<any> {
  return request('/rpc/integration/la/recordBusinessObject', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function recordBusinessObjects(params?: any, option?: any): Promise<any> {
  return request('/rpc/integration/la/recordBusinessObjects', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function recordJobLogAndCheckBoRunning(params?: any, option?: any): Promise<any> {
  return request('/rpc/integration/la/recordJobLogAndCheckBoRunning', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function updateJobLog(params?: any, option?: any): Promise<any> {
  return request('/rpc/integration/la/updateJobLog', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  checkPolicyInsured,
  checkPolicyInsuredIsNew,
  disableBusinessObjects,
  getInsuredInfo,
  getLaResponseDetail,
  recordBusinessObject,
  recordBusinessObjects,
  recordJobLogAndCheckBoRunning,
  updateJobLog,
}

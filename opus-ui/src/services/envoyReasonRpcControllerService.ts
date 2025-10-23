
import request from '@/utils/request';

export async function activateReasonGroup(params?: any, option?: any): Promise<any> {
  return request('/rpc/evy/reasons/activateReasonGroup', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function checkActiveEnvoy(params?: any, option?: any): Promise<any> {
  return request('/rpc/evy/reasons/checkActiveEnvoy', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function checkExistCounterOfferEnvoy(params?: any, option?: any): Promise<any> {
  return request('/rpc/evy/reasons/checkExistCounterOfferEnvoy', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function checkWithdrawNotice(params?: any, option?: any): Promise<any> {
  return request('/rpc/evy/reasons/checkWithdrawNotice', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findReasonInfo(params?: any, option?: any): Promise<any> {
  return request('/rpc/evy/reasons/findReasonInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function furtherRequirementActiveEnvoy(params?: any, option?: any): Promise<any> {
  return request('/rpc/evy/reasons/furtherRequirementActiveEnvoy', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function furtherRequirementDraftEnvoy(params?: any, option?: any): Promise<any> {
  return request('/rpc/evy/reasons/furtherRequirementDraftEnvoy', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function generateDraftReasonGroup(params?: any, option?: any): Promise<any> {
  return request('/rpc/evy/reasons/generateDraftReasonGroup', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getFirstPendingDateByCaseNo(params?: any, option?: any): Promise<any> {
  return request('/rpc/evy/reasons/getFirstPendingDateByCaseNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getReasonDetailBySubCaseNo(params?: any, option?: any): Promise<any> {
  return request('/rpc/evy/reasons/getReasonDetailBySubCaseNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getReasonDetailByTriggerCaseNo(params?: any, option?: any): Promise<any> {
  return request('/rpc/evy/reasons/getReasonDetailByTriggerCaseNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function resolveByReasonCode(params?: any, option?: any): Promise<any> {
  return request('/rpc/evy/reasons/resolveByReasonCode', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function resolveParent(params?: any, option?: any): Promise<any> {
  return request('/rpc/evy/reasons/resolveParent', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function sendReminder(params?: any, option?: any): Promise<any> {
  return request('/rpc/evy/reasons/sendReminder', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function splitEnvoyByDocs(params?: any, option?: any): Promise<any> {
  return request('/rpc/evy/reasons/splitEnvoyByDocs', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function triggerStopSla(params?: any, option?: any): Promise<any> {
  return request('/rpc/evy/reasons/triggerStopSla', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function validateOutstandingEnvoy(params?: any, option?: any): Promise<any> {
  return request('/rpc/evy/reasons/validateOutstandingEnvoy', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function waivedEnvoyByCaseNo(params?: any, option?: any): Promise<any> {
  return request('/rpc/evy/reasons/waivedEnvoyByCaseNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  activateReasonGroup,
  checkActiveEnvoy,
  checkExistCounterOfferEnvoy,
  checkWithdrawNotice,
  findReasonInfo,
  furtherRequirementActiveEnvoy,
  furtherRequirementDraftEnvoy,
  generateDraftReasonGroup,
  getFirstPendingDateByCaseNo,
  getReasonDetailBySubCaseNo,
  getReasonDetailByTriggerCaseNo,
  resolveByReasonCode,
  resolveParent,
  sendReminder,
  splitEnvoyByDocs,
  triggerStopSla,
  validateOutstandingEnvoy,
  waivedEnvoyByCaseNo,
}

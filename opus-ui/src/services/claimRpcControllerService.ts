
import { stringify } from 'qs';
import request from '@/utils/request';

export async function getClaimCase(params?: any, option?: any): Promise<any> {
  return request('/rpc/claim/case/getClaimCase', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function createClaimCaseAndSaveClaimant(params?: any, option?: any): Promise<any> {
  return request('/rpc/claim/createClaimCaseAndSaveClaimant', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function createJpClaimCase(params?: any, option?: any): Promise<any> {
  return request('/rpc/claim/createJpClaimCase', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function search(params?: any, option?: any): Promise<any> {
  return request('/rpc/claim/dropdown/search', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function generateClaimNo(params?: any, option?: any): Promise<any> {
  return request('/rpc/claim/generateClaimNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getClaimAppeal(params?: any, option?: any): Promise<any> {
  return request('/rpc/claim/getClaimAppeal', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getClaimAppealCaseInfo(params?: any, option?: any): Promise<any> {
  return request('/rpc/claim/getClaimAppealCaseInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getClaimLimitData(params?: any, option?: any): Promise<any> {
  return request('/rpc/claim/getClaimLimitData', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getClaimNoByInquiryClaimNo(params?: any, option?: any): Promise<any> {
  return request('/rpc/claim/getClaimNoByInquiryClaimNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getClaimNoListByDates(params?: any, option?: any): Promise<any> {
  return request('/rpc/claim/getClaimNoListByDates', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getClaimNoListByPolicyNo(params?: any, option?: any): Promise<any> {
  return request('/rpc/claim/getClaimNoListByPolicyNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getClaimPayableInfo(params?: any, option?: any): Promise<any> {
  return request('/rpc/claim/getClaimPayableInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getClaimProgressInfo(params?: any, option?: any): Promise<any> {
  return request(`/rpc/claim/getClaimProgressInfo?${stringify(params)}`, {
    ...option,
  });
}

export async function getEClaimSequenceNo(params?: any, option?: any): Promise<any> {
  return request(`/rpc/claim/getEClaimSequenceNo?${stringify(params)}`, {
    ...option,
  });
}

export async function getPendingUserInfo(params?: any, option?: any): Promise<any> {
  return request('/rpc/claim/getPendingUserInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getPolicyAgentByClaimNos(params?: any, option?: any): Promise<any> {
  return request('/rpc/claim/getPolicyAgentByClaimNos', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getPolicyAgentByPolicyNos(params?: any, option?: any): Promise<any> {
  return request('/rpc/claim/getPolicyAgentByPolicyNos', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getRegistrationAdvanceAmount(params?: any, option?: any): Promise<any> {
  return request('/rpc/claim/getRegistrationAdvanceAmount', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getTotalPayableAmount(params?: any, option?: any): Promise<any> {
  return request('/rpc/claim/getTotalPayableAmount', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getHospitalBatchClaimNoByClaimNo(params?: any, option?: any): Promise<any> {
  return request('/rpc/claim/hospital/getHospitalBatchClaimNoByClaimNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function listDashBoardClaimBySubmissionDate(params?: any, option?: any): Promise<any> {
  return request('/rpc/claim/incident/listDashBoardClaimBySubmissionDate', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function listDistinctClaimTypesByClaimNumberList(params?: any, option?: any): Promise<any> {
  return request('/rpc/claim/incident/listDistinctClaimTypesByClaimNumberList', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function listByClaimNos(params?: any, option?: any): Promise<any> {
  return request('/rpc/claim/insured/listByClaimNos', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function updateBenefitProcessing(params?: any, option?: any): Promise<any> {
  return request('/rpc/claim/klip/updateBenefitProcessing', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function listClaimCaseByClaimNos(params?: any, option?: any): Promise<any> {
  return request('/rpc/claim/listClaimCaseByClaimNos', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function listClaimCaseByClaimNosV2(params?: any, option?: any): Promise<any> {
  return request('/rpc/claim/listClaimCaseByClaimNosV2', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getClaimInformation(params?: any, option?: any): Promise<any> {
  return request('/rpc/claim/query/getClaimInformation', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getClaimNosByCurrentClaimNo(params?: any, option?: any): Promise<any> {
  return request('/rpc/claim/query/getClaimNosByCurrentClaimNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getEarlyClaimNos(params?: any, option?: any): Promise<any> {
  return request('/rpc/claim/query/getEarlyClaimNos', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function saveApplyPolicyList(params?: any, option?: any): Promise<any> {
  return request('/rpc/claim/saveApplyPolicyList', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getClaimCase,
  createClaimCaseAndSaveClaimant,
  createJpClaimCase,
  search,
  generateClaimNo,
  getClaimAppeal,
  getClaimAppealCaseInfo,
  getClaimLimitData,
  getClaimNoByInquiryClaimNo,
  getClaimNoListByDates,
  getClaimNoListByPolicyNo,
  getClaimPayableInfo,
  getClaimProgressInfo,
  getEClaimSequenceNo,
  getPendingUserInfo,
  getPolicyAgentByClaimNos,
  getPolicyAgentByPolicyNos,
  getRegistrationAdvanceAmount,
  getTotalPayableAmount,
  getHospitalBatchClaimNoByClaimNo,
  listDashBoardClaimBySubmissionDate,
  listDistinctClaimTypesByClaimNumberList,
  listByClaimNos,
  updateBenefitProcessing,
  listClaimCaseByClaimNos,
  listClaimCaseByClaimNosV2,
  getClaimInformation,
  getClaimNosByCurrentClaimNo,
  getEarlyClaimNos,
  saveApplyPolicyList,
}

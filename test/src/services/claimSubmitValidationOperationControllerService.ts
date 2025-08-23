
import request from '@/utils/request';

export async function endHospitalBatchSubCaseValidate(params?: any, option?: any): Promise<any> {
  return request('/api/claim/submit/validate/endHospitalBatchSubCaseValidate', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function endHospitalBatchValidate(params?: any, option?: any): Promise<any> {
  return request('/api/claim/submit/validate/endHospitalBatchValidate', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function revertHospitalBatchSubCaseValidate(params?: any, option?: any): Promise<any> {
  return request('/api/claim/submit/validate/revertHospitalBatchSubCaseValidate', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function submitHospitalAssessmentValidate(params?: any, option?: any): Promise<any> {
  return request('/api/claim/submit/validate/submitHospitalAssessmentValidate', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function submitJpHighApprovalValidate(params?: any, option?: any): Promise<any> {
  return request('/api/claim/submit/validate/submitJpHighApprovalValidate', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function submitPhAppealAssessmentValidate(params?: any, option?: any): Promise<any> {
  return request('/api/claim/submit/validate/submitPhAppealAssessmentValidate', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function submitPhClaimApprovalValidate(params?: any, option?: any): Promise<any> {
  return request('/api/claim/submit/validate/submitPhClaimApprovalValidate', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function submitPhClaimAssessmentValidate(params?: any, option?: any): Promise<any> {
  return request('/api/claim/submit/validate/submitPhClaimAssessmentValidate', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function v2(params?: any, option?: any): Promise<any> {
  return request('/api/claim/submit/validate/submitPhClaimAssessmentValidate/v2', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function submitPhClaimCaseValidate(params?: any, option?: any): Promise<any> {
  return request('/api/claim/submit/validate/submitPhClaimCaseValidate', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function submitRegisterDeathClaimValidate(params?: any, option?: any): Promise<any> {
  return request('/api/claim/submit/validate/submitRegisterDeathClaimValidate', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  endHospitalBatchSubCaseValidate,
  endHospitalBatchValidate,
  revertHospitalBatchSubCaseValidate,
  submitHospitalAssessmentValidate,
  submitJpHighApprovalValidate,
  submitPhAppealAssessmentValidate,
  submitPhClaimApprovalValidate,
  submitPhClaimAssessmentValidate,
  v2,
  submitPhClaimCaseValidate,
  submitRegisterDeathClaimValidate,
}

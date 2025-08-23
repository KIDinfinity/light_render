
import request from '@/utils/request';

export async function apply(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/jp/clm/apply', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function create(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/jp/clm/create', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function get(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/jp/clm/get', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getClaimAssessment(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/jp/clm/getClaimAssessment', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getDocuments(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/jp/clm/getDocuments', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getPolicyInfo(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/jp/clm/getPolicyInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getPolicyInsuredBeneficiaryOwner(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/jp/clm/getPolicyInsuredBeneficiaryOwner', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getQC(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/jp/clm/getQC', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function v2(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/jp/clm/getQC/v2', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function judgmentOfCauseOfIncident(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/jp/clm/judgmentOfCauseOfIncident', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function listDefaultDocuments(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/jp/clm/listDefaultDocuments', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function reAssessment(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/jp/clm/reAssessment', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function reassessByAssignDocument(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/jp/clm/reassessByAssignDocument', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function save(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/jp/clm/save', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function sendAppForm(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/jp/clm/sendAppForm', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function sendAppFormV2(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/jp/clm/sendAppFormV2', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function submitClaimAssessment(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/jp/clm/submitClaimAssessment', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function validate(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/jp/clm/validate', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  apply,
  create,
  get,
  getClaimAssessment,
  getDocuments,
  getPolicyInfo,
  getPolicyInsuredBeneficiaryOwner,
  getQC,
  v2,
  judgmentOfCauseOfIncident,
  listDefaultDocuments,
  reAssessment,
  reassessByAssignDocument,
  save,
  sendAppForm,
  sendAppFormV2,
  submitClaimAssessment,
  validate,
}

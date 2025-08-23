import request from '@/utils/request';

export async function batchReSubmit(params?: any, option?: any): Promise<any> {
  return request(`/api/navigator/cases/batchReSubmit`, {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function cancel(params?: any, option?: any): Promise<any> {
  return request(`/api/navigator/cases/cancel`, {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function cancelBusiness(params?: any, option?: any): Promise<any> {
  return request(`/api/navigator/cases/cancelBusiness`, {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function create(params?: any, option?: any): Promise<any> {
  return request(`/api/navigator/cases/create`, {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function envoySubmit(params?: any, option?: any): Promise<any> {
  return request(`/api/navigator/cases/envoySubmit`, {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getCaseDetail(params?: any, option?: any): Promise<any> {
  return request(`/api/navigator/cases/getCaseDetail`, {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function inquiryClient(params?: any, option?: any): Promise<any> {
  return request(`/api/navigator/cases/inquiryClient`, {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function rejectThOldProcessBusiness(params?: any, option?: any): Promise<any> {
  return request(`/api/navigator/cases/rejectThOldProcessBusiness`, {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function retry(params?: any, option?: any): Promise<any> {
  return request(`/api/navigator/cases/retry`, {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function reverse(params?: any, option?: any): Promise<any> {
  return request(`/api/navigator/cases/reverse`, {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function revert(params?: any, option?: any): Promise<any> {
  return request(`/api/navigator/cases/revert`, {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function revertThOldProcess(params?: any, option?: any): Promise<any> {
  return request(`/api/navigator/cases/revertThOldProcess`, {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function revertV2(params?: any, option?: any): Promise<any> {
  return request(`/api/navigator/cases/revertV2`, {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function splitCaseV2(params?: any, option?: any): Promise<any> {
  return request(`/api/navigator/cases/splitCaseV2`, {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function submit(params?: any, option?: any): Promise<any> {
  return request(`/api/navigator/cases/submit`, {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function submitBusiness(params?: any, option?: any): Promise<any> {
  return request(`/api/navigator/cases/submitBusiness`, {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function triggerCreate(params?: any, option?: any): Promise<any> {
  return request(`/api/navigator/cases/triggerCreate`, {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function validateApprovalInfo(params?: any, option?: any): Promise<any> {
  return request(`/api/navigator/cases/validateApprovalInfo`, {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function validateBusiness(params?: any, option?: any): Promise<any> {
  return request(`/api/navigator/cases/validateBusiness`, {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function withdraw(params?: any, option?: any): Promise<any> {
  return request(`/api/navigator/cases/withdraw`, {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  batchReSubmit,
  cancel,
  cancelBusiness,
  create,
  envoySubmit,
  getCaseDetail,
  inquiryClient,
  rejectThOldProcessBusiness,
  retry,
  reverse,
  revert,
  revertThOldProcess,
  revertV2,
  splitCaseV2,
  submit,
  submitBusiness,
  triggerCreate,
  validateApprovalInfo,
  validateBusiness,
  withdraw,
};

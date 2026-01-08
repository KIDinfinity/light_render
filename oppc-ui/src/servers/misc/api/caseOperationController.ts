// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/navigator/cases/batchCancelAndSaveInformation */
export async function batchCancelAndSaveInformation(
  body: API.BatchCancelAndSaveInformationVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>(
    '/api/navigator/cases/batchCancelAndSaveInformation',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/navigator/cases/batchReSubmit */
export async function batchRetry(
  body: API.RetryCaseSubmitVO[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/navigator/cases/batchReSubmit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/navigator/cases/cancel */
export async function cancel(
  body: API.CaseCancellationVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/navigator/cases/cancel', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/navigator/cases/cancelBusiness */
export async function cancelBusiness(
  body: API.CaseCancellationVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/navigator/cases/cancelBusiness', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/navigator/cases/create */
export async function create3(
  body: API.CaseCreationVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/navigator/cases/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/navigator/cases/envoySubmit */
export async function envoySubmit(
  body: API.CaseSubmitVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/navigator/cases/envoySubmit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/navigator/cases/getCaseDetail */
export async function getCaseDetail(
  body: API.CaseDetailQueryVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOTaskDataVO>('/api/navigator/cases/getCaseDetail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/navigator/cases/inquiryClient */
export async function inquiryClient(
  body: API.BusinessQueryVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/navigator/cases/inquiryClient', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/navigator/cases/rejectThOldProcessBusiness */
export async function rejectOldProcess(
  body: API.CaseSubmitVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOBusinessSubmitResultVO>(
    '/api/navigator/cases/rejectThOldProcessBusiness',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/navigator/cases/retry */
export async function retry(
  body: API.RetryCaseSubmitVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/navigator/cases/retry', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/navigator/cases/reverse */
export async function reverse(
  body: API.CaseCancellationVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/navigator/cases/reverse', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/navigator/cases/revert */
export async function revert(
  body: API.CaseRevertVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/navigator/cases/revert', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/navigator/cases/revertThOldProcess */
export async function revertOldProcess(
  body: API.CaseSubmitVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/navigator/cases/revertThOldProcess', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/navigator/cases/revertV2 */
export async function revertV2(
  body: API.CaseSubmitVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/navigator/cases/revertV2', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/navigator/cases/splitCaseV2 */
export async function splitCase2(
  body: API.SplitCaseSubmitVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOSplitCaseSubmitVOObject>(
    '/api/navigator/cases/splitCaseV2',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/navigator/cases/submit */
export async function submit1(
  body: API.CaseSubmitVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/navigator/cases/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/navigator/cases/submitBusiness */
export async function submitBusiness(
  body: API.CaseSubmitVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/navigator/cases/submitBusiness', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/navigator/cases/triggerCreate */
export async function triggerCreate(
  body: API.TriggerProcessCreationVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOCaseCreateResultVO>(
    '/api/navigator/cases/triggerCreate',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/navigator/cases/validateApprovalInfo */
export async function splitCase1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.splitCase1Params,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOMapObjectObject>(
    '/api/navigator/cases/validateApprovalInfo',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/navigator/cases/validateBusiness */
export async function validateBusiness(
  body: API.CaseSubmitVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/navigator/cases/validateBusiness', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/navigator/cases/withdraw */
export async function withdraw(
  body: API.CaseSubmitVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/navigator/cases/withdraw', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

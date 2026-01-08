// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/bpm/v2/process/cancel */
export async function cancelProcess(
  body: API.CaseCancellationVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOString>('/api/bpm/v2/process/cancel', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/v2/process/cancelBusiness */
export async function cancelBusiness(
  body: API.CaseCancellationVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/bpm/v2/process/cancelBusiness', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/v2/process/cancelByCreateTime */
export async function cancelProcessByCreateTime(
  body: API.CancleCaseVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOString>('/api/bpm/v2/process/cancelByCreateTime', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/v2/process/getBusinessProcessInfo */
export async function getBusinessProcessInfo(
  body: API.ProcessQueryRequestVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOProcessQueryResponseVO>(
    '/api/bpm/v2/process/getBusinessProcessInfo',
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

/** 此处后端没有提供注释 POST /api/bpm/v2/process/getCaseHisVariables */
export async function getCaseHisVariables(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCaseHisVariablesParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOMapStringObject>(
    '/api/bpm/v2/process/getCaseHisVariables',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/bpm/v2/process/listProcessTraces */
export async function listProcessTraces(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listProcessTracesParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListProcessActivityVO>(
    '/api/bpm/v2/process/listProcessTraces',
    {
      method: 'POST',
      params: {
        // order has a default value: desc
        order: 'desc',
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/bpm/v2/process/reverse */
export async function reverseProcess(
  body: API.CaseCancellationVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOString>('/api/bpm/v2/process/reverse', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/v2/process/revert */
export async function revertProcess(
  body: API.CaseRevertVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/bpm/v2/process/revert', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/v2/process/splitCase */
export async function splitCase1(
  body: API.CaseSubmitVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/bpm/v2/process/splitCase', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/v2/process/start */
export async function start(
  body: API.CaseCreationVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOCaseTaskVO>('/api/bpm/v2/process/start', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/v2/process/submitBillingSettlement */
export async function submitBillingSettlement(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/bpm/v2/process/submitBillingSettlement', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/v2/process/touch */
export async function touch(
  body: API.CaseSubmitVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/bpm/v2/process/touch', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/v2/process/wasCaseRejected */
export async function wasCaseRejected(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.wasCaseRejectedParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOBoolean>('/api/bpm/v2/process/wasCaseRejected', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

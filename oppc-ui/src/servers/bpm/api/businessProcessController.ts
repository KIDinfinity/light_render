// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/bpm/bizProcess/countTaskStatus */
export async function countTaskStatus(
  body: API.ProcessDefinitionStatus,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListProcessDefinitionStatus>(
    '/api/bpm/bizProcess/countTaskStatus',
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

/** 此处后端没有提供注释 GET /api/bpm/bizProcess/findBizData */
export async function findBizData(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findBizDataParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOBusinessData>('/api/bpm/bizProcess/findBizData', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/bizProcess/findBizDataObject */
export async function findBizDataObject1(
  body: API.InquiryParamVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOMapStringObject>(
    '/api/bpm/bizProcess/findBizDataObject',
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

/** 此处后端没有提供注释 POST /api/bpm/bizProcess/findBizProcess */
export async function findBizProcess1(
  body: API.BusinessProcess,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOBusinessProcess>(
    '/api/bpm/bizProcess/findBizProcess',
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

/** 此处后端没有提供注释 POST /api/bpm/bizProcess/findEndTimeByCaseCategoryAndPolicyNo */
export async function findEndTimeByCaseCategoryAndPolicyNo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findEndTimeByCaseCategoryAndPolicyNoParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVODate>(
    '/api/bpm/bizProcess/findEndTimeByCaseCategoryAndPolicyNo',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/bpm/bizProcess/getClaimCaseNo */
export async function getClaimCaseNo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getClaimCaseNoParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOString>('/api/bpm/bizProcess/getClaimCaseNo', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/bizProcess/getPreApprovalValue */
export async function getPreApprovalValue(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPreApprovalValueParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOString>(
    '/api/bpm/bizProcess/getPreApprovalValue',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/bpm/bizProcess/judgeIsBeforeMainActivityComplete */
export async function judgeIsBeforeMainActivityComplete(
  body: API.CheckMainActivityRequest,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOCheckMainActivityResponse>(
    '/api/bpm/bizProcess/judgeIsBeforeMainActivityComplete',
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

/** 此处后端没有提供注释 POST /api/bpm/bizProcess/saveBusinessProcess */
export async function saveBusinessProcess1(
  body: API.BusinessProcess,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/bpm/bizProcess/saveBusinessProcess', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/bizProcess/selectPosCancelledAndCompletedSrvNo */
export async function selectPosCancelledAndCompletedSrvNo(
  options?: {
    [key: string]: any;
  },
) {
  return request<API.ResultVOListString>(
    '/api/bpm/bizProcess/selectPosCancelledAndCompletedSrvNo',
    {
      method: 'POST',
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/bpm/bizProcess/update */
export async function updateBizProcess(
  body: API.BusinessProcess,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOInteger>('/api/bpm/bizProcess/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/bizProcess/updateInquiryBusinessNo */
export async function updateInquiryBusinessNo(
  body: API.InquiryBusinessObjectVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/bpm/bizProcess/updateInquiryBusinessNo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/bizProcess/updateStatusManual */
export async function updateStatusManual(
  body: API.BusinessProcess,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/bpm/bizProcess/updateStatusManual', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/bizProcess/updateStatusManualByCaseNo */
export async function updateStatusManualByCaseNo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateStatusManualByCaseNoParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>(
    '/api/bpm/bizProcess/updateStatusManualByCaseNo',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/bpm/process/getBusinessProcessWithLatestFullStp */
export async function getBusinessProcessWithLatestFullStp(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getBusinessProcessWithLatestFullStpParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOBusinessProcess>(
    '/api/bpm/process/getBusinessProcessWithLatestFullStp',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/bpm/process/toggleUrgent */
export async function toggleUrgent(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.toggleUrgentParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/bpm/process/toggleUrgent', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

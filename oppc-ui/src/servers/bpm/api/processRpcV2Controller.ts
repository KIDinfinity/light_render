// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /rpc/bpm/v2/complete */
export async function complete(
  body: API.TaskCompletionVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOCaseTaskVO>('/rpc/bpm/v2/complete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/v2/completeTask */
export async function completeTask(
  body: API.TaskParam,
  options?: { [key: string]: any },
) {
  return request<any>('/rpc/bpm/v2/completeTask', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/v2/findUncloseCaseInfo */
export async function findUncloseCaseInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findUncloseCaseInfoParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOCaseTaskVO>('/rpc/bpm/v2/findUncloseCaseInfo', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/v2/findUncloseCaseTaskInfoByBusinessInfo */
export async function findUncloseCaseTaskInfoByBusinessInfo(
  body: API.CaseBusinessInfoVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOCaseTaskVO>(
    '/rpc/bpm/v2/findUncloseCaseTaskInfoByBusinessInfo',
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

/** 此处后端没有提供注释 POST /rpc/bpm/v2/findUnCloseCaseTaskInfoByPolicyIdAndBusinessCode */
export async function findUnCloseCaseTaskInfoByPolicyIdAndBusinessCode(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findUnCloseCaseTaskInfoByPolicyIdAndBusinessCodeParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOCaseTaskVO>(
    '/rpc/bpm/v2/findUnCloseCaseTaskInfoByPolicyIdAndBusinessCode',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/bpm/v2/getBusinessData */
export async function getBusinessData(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getBusinessDataParams,
  options?: { [key: string]: any },
) {
  return request<API.BusinessData>('/rpc/bpm/v2/getBusinessData', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/v2/getBusinessOperation */
export async function getBusinessOperation(
  body: API.BusinessOperationDO,
  options?: { [key: string]: any },
) {
  return request<API.BusinessOperationDO>('/rpc/bpm/v2/getBusinessOperation', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/v2/getBusinessOperationSubList */
export async function getBusinessOperationSubList(
  body: API.BusinessOperationSubDO,
  options?: { [key: string]: any },
) {
  return request<API.BusinessOperationSubDO[]>(
    '/rpc/bpm/v2/getBusinessOperationSubList',
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

/** 此处后端没有提供注释 POST /rpc/bpm/v2/getBusinessProcessByPolicyNoAndBusinessType */
export async function getBusinessProcessByPolicyNoAndBusinessType(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getBusinessProcessByPolicyNoAndBusinessTypeParams,
  options?: { [key: string]: any },
) {
  return request<API.BusinessProcess[]>(
    '/rpc/bpm/v2/getBusinessProcessByPolicyNoAndBusinessType',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/bpm/v2/getBusinessProcessByPolicyNoAndCaseCategory */
export async function getBusinessProcessByPolicyNoAndCaseCategory(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getBusinessProcessByPolicyNoAndCaseCategoryParams,
  options?: { [key: string]: any },
) {
  return request<API.BusinessProcess[]>(
    '/rpc/bpm/v2/getBusinessProcessByPolicyNoAndCaseCategory',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/bpm/v2/getCaseNoByBusinessNoBatch */
export async function getCaseNoByBusinessNoBatch(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<string[]>('/rpc/bpm/v2/getCaseNoByBusinessNoBatch', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/v2/getLatestActiveProcess */
export async function getLatestActiveProcess(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getLatestActiveProcessParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOBusinessProcess>(
    '/rpc/bpm/v2/getLatestActiveProcess',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/bpm/v2/getRelateCaseAndBuildSubmitObj */
export async function getRelateCaseAndBuildSubmitObj(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.CaseSubmitVO[]>(
    '/rpc/bpm/v2/getRelateCaseAndBuildSubmitObj',
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

/** 此处后端没有提供注释 POST /rpc/bpm/v2/listBusinessOperation */
export async function listBusinessOperation(
  body: API.BusinessOperationDO,
  options?: { [key: string]: any },
) {
  return request<API.BusinessOperationDO[]>(
    '/rpc/bpm/v2/listBusinessOperation',
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

/** 此处后端没有提供注释 POST /rpc/bpm/v2/saveBusinessData */
export async function saveBusinessData(
  body: API.BusinessData,
  options?: { [key: string]: any },
) {
  return request<any>('/rpc/bpm/v2/saveBusinessData', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/v2/startProcessInstance */
export async function startProcessInstance(
  body: API.ProcessParam,
  options?: { [key: string]: any },
) {
  return request<API.ProcessInfoVO>('/rpc/bpm/v2/startProcessInstance', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/v2/startProcessInstanceSync */
export async function startProcessSynchronization(
  body: API.ProcessParam,
  options?: { [key: string]: any },
) {
  return request<API.ProcessInfoVO>('/rpc/bpm/v2/startProcessInstanceSync', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/v2/task/createJpNonOpusPostProcessing */
export async function createJpNonOpusPostProcessing(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.createJpNonOpusPostProcessingParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>(
    '/rpc/bpm/v2/task/createJpNonOpusPostProcessing',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

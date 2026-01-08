// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /rpc/bpm/bizProcess/findAllAutoActivities */
export async function findAllAutoActivities(options?: { [key: string]: any }) {
  return request<API.ResultVOListProcessActivity>(
    '/rpc/bpm/bizProcess/findAllAutoActivities',
    {
      method: 'POST',
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/bpm/bizProcess/findBizDataObject */
export async function findBizDataObject(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findBizDataObjectParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOMapStringObject>(
    '/rpc/bpm/bizProcess/findBizDataObject',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/bpm/bizProcess/findBizProcess */
export async function findBizProcess(
  body: API.BusinessProcess,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOBusinessProcess>(
    '/rpc/bpm/bizProcess/findBizProcess',
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

/** 此处后端没有提供注释 POST /rpc/bpm/bizProcess/listBizProcessByTaskIds */
export async function listBizProcessByTaskIds(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listBizProcessByTaskIdsParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListBusinessProcess>(
    '/rpc/bpm/bizProcess/listBizProcessByTaskIds',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/bpm/bizProcess/listMainActivityKey */
export async function listMainActivityKey(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listMainActivityKeyParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListString>(
    '/rpc/bpm/bizProcess/listMainActivityKey',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/bpm/bizProcess/updateAgentId */
export async function updateAgentId(
  body: API.BusinessProcess[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/rpc/bpm/bizProcess/updateAgentId', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/findRelatedBusinessNo */
export async function findRelatedBusinessNo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findRelatedBusinessNoParams,
  options?: { [key: string]: any },
) {
  return request<string[]>('/rpc/bpm/findRelatedBusinessNo', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/listByType */
export async function listExternalUsersByType(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listExternalUsersByTypeParams,
  options?: { [key: string]: any },
) {
  return request<API.ExternalUser[]>('/rpc/bpm/listByType', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/listFormerCase */
export async function listFormerCases(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listFormerCasesParams,
  options?: { [key: string]: any },
) {
  return request<Record>('/rpc/bpm/listFormerCase', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/process/checkProcessInstance */
export async function checkProcessInstance(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.checkProcessInstanceParams,
  options?: { [key: string]: any },
) {
  return request<boolean>('/rpc/bpm/process/checkProcessInstance', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/process/checkSplitCaseByBusinessNo */
export async function checkSplitCaseByBusinessNo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.checkSplitCaseByBusinessNoParams,
  options?: { [key: string]: any },
) {
  return request<boolean>('/rpc/bpm/process/checkSplitCaseByBusinessNo', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/process/existsValidCase */
export async function existsValidCase(
  body: API.CheckCaseParamsVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOBoolean>('/rpc/bpm/process/existsValidCase', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/process/findByBusinessNo */
export async function findByBusinessNo1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findByBusinessNo1Params,
  options?: { [key: string]: any },
) {
  return request<API.BusinessProcess[]>('/rpc/bpm/process/findByBusinessNo', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/process/findByInquiryBusinessNo */
export async function findByInquiryBusinessNo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findByInquiryBusinessNoParams,
  options?: { [key: string]: any },
) {
  return request<API.BusinessProcess[]>(
    '/rpc/bpm/process/findByInquiryBusinessNo',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/bpm/process/findInprogressBusinessProcessByPolicyId */
export async function findInprogressBusinessProcessByPolicyId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findInprogressBusinessProcessByPolicyIdParams,
  options?: { [key: string]: any },
) {
  return request<API.BusinessProcess[]>(
    '/rpc/bpm/process/findInprogressBusinessProcessByPolicyId',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/bpm/process/findProcessStatus */
export async function findProcessStatus(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findProcessStatusParams,
  options?: { [key: string]: any },
) {
  return request<string>('/rpc/bpm/process/findProcessStatus', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/process/findProcessTaskByBusinessNo */
export async function findProcessTaskByBusinessNo(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListBusinessProcessTaskVO>(
    '/rpc/bpm/process/findProcessTaskByBusinessNo',
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

/** 此处后端没有提供注释 POST /rpc/bpm/process/findRelatedBusinessProcess */
export async function findRelatedBusinessProcess(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findRelatedBusinessProcessParams,
  options?: { [key: string]: any },
) {
  return request<API.BusinessProcess>(
    '/rpc/bpm/process/findRelatedBusinessProcess',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/bpm/process/getBusinessByCaseNo */
export async function getBusinessByCaseNo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getBusinessByCaseNoParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOBusinessProcess>(
    '/rpc/bpm/process/getBusinessByCaseNo',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/bpm/process/getBusinessProcessByCaseNo */
export async function getBusinessProcessByCaseNo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getBusinessProcessByCaseNoParams,
  options?: { [key: string]: any },
) {
  return request<API.BusinessProcess>(
    '/rpc/bpm/process/getBusinessProcessByCaseNo',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/bpm/process/getBusinessProcessByCaseNoList */
export async function getBusinessProcessByCaseNoList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getBusinessProcessByCaseNoListParams,
  options?: { [key: string]: any },
) {
  return request<API.BusinessProcess[]>(
    '/rpc/bpm/process/getBusinessProcessByCaseNoList',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/bpm/process/getBusinessProcessOnlyByCaseNoList */
export async function getBusinessProcessOnlyByCaseNoList(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.BusinessProcess[]>(
    '/rpc/bpm/process/getBusinessProcessOnlyByCaseNoList',
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

/** 此处后端没有提供注释 POST /rpc/bpm/process/getCaseAfterManualUwWithSpecialError */
export async function getCaseAfterManualUwWithSpecialError(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCaseAfterManualUwWithSpecialErrorParams,
  options?: { [key: string]: any },
) {
  return request<API.BusinessProcess[]>(
    '/rpc/bpm/process/getCaseAfterManualUwWithSpecialError',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/bpm/process/getCaseNo */
export async function getCaseNo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCaseNoParams,
  options?: { [key: string]: any },
) {
  return request<string>('/rpc/bpm/process/getCaseNo', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/process/getCaseNoList */
export async function getCaseNoList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCaseNoListParams,
  options?: { [key: string]: any },
) {
  return request<string[]>('/rpc/bpm/process/getCaseNoList', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/process/getCaseNoListByInquiryBusinessNo */
export async function getCaseNoListByInquiryBusinessNo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCaseNoListByInquiryBusinessNoParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListString>(
    '/rpc/bpm/process/getCaseNoListByInquiryBusinessNo',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/bpm/process/getCaseNoListByInquiryClaimNo */
export async function getCaseNoListByInquiryClaimNo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCaseNoListByInquiryClaimNoParams,
  options?: { [key: string]: any },
) {
  return request<API.BusinessProcess[]>(
    '/rpc/bpm/process/getCaseNoListByInquiryClaimNo',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/bpm/process/getCaseNoListV2 */
export async function getCaseNoListV2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCaseNoListV2Params,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListString>('/rpc/bpm/process/getCaseNoListV2', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/process/getFullStpFLagByBusinessNo */
export async function getFullStpFLagByBusinessNo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getFullStpFLagByBusinessNoParams,
  options?: { [key: string]: any },
) {
  return request<boolean>('/rpc/bpm/process/getFullStpFLagByBusinessNo', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/process/getManualAssessmentAssignee */
export async function getManualAssessmentAssignee(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<Record>('/rpc/bpm/process/getManualAssessmentAssignee', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/process/getProcessBusinessFlags */
export async function getProcessBusinessFlags(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getProcessBusinessFlagsParams,
  options?: { [key: string]: any },
) {
  return request<API.ProcessBusinessFlagVO>(
    '/rpc/bpm/process/getProcessBusinessFlags',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/bpm/process/getProcessByCaseNo */
export async function getProcessByCaseNo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getProcessByCaseNoParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOBusinessProcess>(
    '/rpc/bpm/process/getProcessByCaseNo',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/bpm/process/getProcessCreator */
export async function getProcessCreator(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getProcessCreatorParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOString>('/rpc/bpm/process/getProcessCreator', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/process/getProcessDefinition */
export async function getProcessDefinition(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getProcessDefinitionParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOProcessDefinition>(
    '/rpc/bpm/process/getProcessDefinition',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/bpm/process/getRelatedCase */
export async function getRelatedCase(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getRelatedCaseParams,
  options?: { [key: string]: any },
) {
  return request<boolean>('/rpc/bpm/process/getRelatedCase', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/process/getSplitRemark */
export async function getSplitRemark(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<Record>('/rpc/bpm/process/getSplitRemark', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/process/getSplitRemarkByBusinessNos */
export async function getSplitRemarkByBusinessNos(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.SplitRemarkVO[]>(
    '/rpc/bpm/process/getSplitRemarkByBusinessNos',
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

/** 此处后端没有提供注释 POST /rpc/bpm/process/getStpFlagByBusinessNo */
export async function getStpFlagByBusinessNo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getStpFlagByBusinessNoParams,
  options?: { [key: string]: any },
) {
  return request<boolean>('/rpc/bpm/process/getStpFlagByBusinessNo', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/process/getUnclosedByCaseNo */
export async function getUnclosedByCaseNo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUnclosedByCaseNoParams,
  options?: { [key: string]: any },
) {
  return request<API.BusinessProcess>('/rpc/bpm/process/getUnclosedByCaseNo', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/process/getVipCaseNos */
export async function getVipCaseNos(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.BusinessProcess[]>('/rpc/bpm/process/getVipCaseNos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/process/getVipFlagByBusinessNo */
export async function getVipFlagByBusinessNo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getVipFlagByBusinessNoParams,
  options?: { [key: string]: any },
) {
  return request<number>('/rpc/bpm/process/getVipFlagByBusinessNo', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/process/listAutoActByProcDefIds */
export async function listAutoActByProcDefIds(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listAutoActByProcDefIdsParams,
  options?: { [key: string]: any },
) {
  return request<Record>('/rpc/bpm/process/listAutoActByProcDefIds', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/process/listBusinessProcessByInquiryBusinessNo */
export async function listBusinessProcessByInquiryBusinessNo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listBusinessProcessByInquiryBusinessNoParams,
  options?: { [key: string]: any },
) {
  return request<API.BusinessProcess[]>(
    '/rpc/bpm/process/listBusinessProcessByInquiryBusinessNo',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/bpm/process/listByBusinessNos */
export async function listByBusinessNos(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.BusinessProcess[]>('/rpc/bpm/process/listByBusinessNos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/process/listByCaseCategoryStatus */
export async function listByCaseCategoryStatus(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listByCaseCategoryStatusParams,
  options?: { [key: string]: any },
) {
  return request<API.BusinessProcess[]>(
    '/rpc/bpm/process/listByCaseCategoryStatus',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/bpm/process/listByInquiryBusinessNos */
export async function listByInquiryBusinessNos(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.BusinessProcess[]>(
    '/rpc/bpm/process/listByInquiryBusinessNos',
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

/** 此处后端没有提供注释 POST /rpc/bpm/process/listProcessAct */
export async function listProcessAct(options?: { [key: string]: any }) {
  return request<Record>('/rpc/bpm/process/listProcessAct', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/process/listProcessActByProcDefId */
export async function listProcessActByProcDefId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listProcessActByProcDefIdParams,
  options?: { [key: string]: any },
) {
  return request<API.ProcessActivity[]>(
    '/rpc/bpm/process/listProcessActByProcDefId',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/bpm/process/listProcessByBusinessNo */
export async function listProcessByBusinessNo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listProcessByBusinessNoParams,
  options?: { [key: string]: any },
) {
  return request<API.BusinessProcess[]>(
    '/rpc/bpm/process/listProcessByBusinessNo',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/bpm/process/listProcessByBusinessNos */
export async function listProcessByBusinessNos(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListBusinessProcess>(
    '/rpc/bpm/process/listProcessByBusinessNos',
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

/** 此处后端没有提供注释 POST /rpc/bpm/process/listProcessDetails */
export async function listProcessDetails(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.ProcessDetail[]>('/rpc/bpm/process/listProcessDetails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/process/listProcessInstancesHist */
export async function listProcessInstances(
  body: API.Page,
  options?: { [key: string]: any },
) {
  return request<any>('/rpc/bpm/process/listProcessInstancesHist', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/process/saveBusinessProcess */
export async function saveBusinessProcess(
  body: API.BusinessProcess,
  options?: { [key: string]: any },
) {
  return request<number>('/rpc/bpm/process/saveBusinessProcess', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/process/splitCase */
export async function splitCase(
  body: API.ProcessParam,
  options?: { [key: string]: any },
) {
  return request<boolean>('/rpc/bpm/process/splitCase', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/process/startProcessInstance */
export async function startProcessInstance1(
  body: API.ProcessParam,
  options?: { [key: string]: any },
) {
  return request<API.ProcessInfoVO>('/rpc/bpm/process/startProcessInstance', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/process/startSyncProcessInstance */
export async function startSyncProcessInstance(
  body: API.ProcessParam,
  options?: { [key: string]: any },
) {
  return request<API.ProcessInfoVO>(
    '/rpc/bpm/process/startSyncProcessInstance',
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

/** 此处后端没有提供注释 POST /rpc/bpm/process/updateBusinessProcessInfo */
export async function updateBusinessProcessInfo(
  body: API.BusinessProcess,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>(
    '/rpc/bpm/process/updateBusinessProcessInfo',
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

/** 此处后端没有提供注释 POST /rpc/bpm/process/updateDocScanningCase */
export async function updateDocScanningCase(
  body: Record,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/rpc/bpm/process/updateDocScanningCase', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/process/updatePendInfo */
export async function updatePendInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updatePendInfoParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/rpc/bpm/process/updatePendInfo', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/process/updateSubmissionDateAndBusinessType */
export async function updateSubmissionDateAndBusinessType(
  body: API.BusinessProcess,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>(
    '/rpc/bpm/process/updateSubmissionDateAndBusinessType',
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

/** 此处后端没有提供注释 POST /rpc/bpm/process/updateVipFlag */
export async function updateVipFlag(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateVipFlagParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/rpc/bpm/process/updateVipFlag', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/process/updateVipFlagByCase */
export async function updateVipFlagByCase(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateVipFlagByCaseParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/rpc/bpm/process/updateVipFlagByCase', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/processJobInfo/getProcessJobInfo */
export async function getProcessJobInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getProcessJobInfoParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOProcessJobInfoDO>(
    '/rpc/bpm/processJobInfo/getProcessJobInfo',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

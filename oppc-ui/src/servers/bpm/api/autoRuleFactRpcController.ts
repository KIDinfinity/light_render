// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /rpc/bpm/findCaseLabels */
export async function findCaseLabels(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findCaseLabelsParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListRuleCommonRpcFactInfoVO>(
    '/rpc/bpm/findCaseLabels',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/bpm/findInquiryBusinessTasksByCaseNo */
export async function findInquiryBusinessTasksByCaseNo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findInquiryBusinessTasksByCaseNoParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListAABusinessTask>(
    '/rpc/bpm/findInquiryBusinessTasksByCaseNo',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/bpm/findRuleEffectiveDate */
export async function findRuleEffectiveDate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findRuleEffectiveDateParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListRuleCommonRpcFactInfoVO>(
    '/rpc/bpm/findRuleEffectiveDate',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/bpm/task/countAllUserTaskVolume */
export async function countAllUserTaskVolume(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.countAllUserTaskVolumeParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListRuleCommonRpcFactInfoVO>(
    '/rpc/bpm/task/countAllUserTaskVolume',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/bpm/task/findActHiTaskInst */
export async function findActHiTaskInst(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findActHiTaskInstParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListRuleCommonRpcFactInfoVO>(
    '/rpc/bpm/task/findActHiTaskInst',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/bpm/task/findPolicyTaskByPolicyNo */
export async function findPolicyTaskByPolicyNo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findPolicyTaskByPolicyNoParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListRuleCommonRpcFactInfoVO>(
    '/rpc/bpm/task/findPolicyTaskByPolicyNo',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/bpm/task/findRelationCaseByBusinessNo */
export async function findRelationCaseByBusinessNo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findRelationCaseByBusinessNoParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListRuleCommonRpcFactInfoVO>(
    '/rpc/bpm/task/findRelationCaseByBusinessNo',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/bpm/task/findSharingTaskByBusinessNo */
export async function findSharingTaskByBusinessNo1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findSharingTaskByBusinessNo1Params,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListRuleCommonRpcFactInfoVO>(
    '/rpc/bpm/task/findSharingTaskByBusinessNo',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/bpm/task/findSunmarryTaskVolume */
export async function findSunmarryTaskVolume(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findSunmarryTaskVolumeParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListRuleCommonRpcFactInfoVO>(
    '/rpc/bpm/task/findSunmarryTaskVolume',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/bpm/task/findTaskApprover */
export async function findTaskApprover(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findTaskApproverParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListRuleCommonRpcFactInfoVO>(
    '/rpc/bpm/task/findTaskApprover',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/bpm/task/findTaskVolume */
export async function findTaskVolume(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findTaskVolumeParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListRuleCommonRpcFactInfoVO>(
    '/rpc/bpm/task/findTaskVolume',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

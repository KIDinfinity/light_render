// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/bpm/manual/workflow/getManuallyWorkflow */
export async function getManuallyWorkflow(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getManuallyWorkflowParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOWorkflowVO>(
    '/api/bpm/manual/workflow/getManuallyWorkflow',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/bpm/manual/workflow/getNextActivityByCaseNo */
export async function getNextActivityByCaseNo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getNextActivityByCaseNoParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOWorkflowVO>(
    '/api/bpm/manual/workflow/getNextActivityByCaseNo',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

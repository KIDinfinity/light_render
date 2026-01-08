// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/evy/reasons/findExtraFunctionsByGroupId */
export async function findExtraFunctionsByGroupId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findExtraFunctionsByGroupIdParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListReasonExtraFunctionVO>(
    '/api/evy/reasons/findExtraFunctionsByGroupId',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/evy/reasons/findSuccessTemplateByGroupId */
export async function findSuccessTemplateByGroupId(
  body: API.ReasonExtraFunctionVO[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVOCorrespondenceResultVO>(
    '/api/evy/reasons/findSuccessTemplateByGroupId',
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

/** 此处后端没有提供注释 POST /api/evy/reasons/refreshReasonExtraFunction */
export async function refreshReasonExtraFunction(
  body: API.RetryReasonExtraFunctionVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListReasonExtraFunctionVO>(
    '/api/evy/reasons/refreshReasonExtraFunction',
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

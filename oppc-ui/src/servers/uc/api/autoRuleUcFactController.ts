// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /rpc/uc/findOrganCodeByUser */
export async function findOrganCodeByUser(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.UserOrganizationDO[]>('/rpc/uc/findOrganCodeByUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/uc/task/findMaxTaskVolume */
export async function findMaxTaskVolume(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findMaxTaskVolumeParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListRuleCommonRpcFactInfoVO>(
    '/rpc/uc/task/findMaxTaskVolume',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/uc/user/findMaxTaskVolumeByUser */
export async function findMaxTaskVolumeByUser(
  body: API.UserAutoRuleFactInfoInquiryVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListRuleCommonRpcFactInfoVO>(
    '/rpc/uc/user/findMaxTaskVolumeByUser',
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

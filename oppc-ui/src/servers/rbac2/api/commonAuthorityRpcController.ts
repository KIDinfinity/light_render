// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /rpc/rbac2/commonAuthority/findCommonAuthorityUserGroupV2 */
export async function findCommonAuthorityUserGroupV2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findCommonAuthorityUserGroupV2Params,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListMatchUserGroupVO>(
    '/rpc/rbac2/commonAuthority/findCommonAuthorityUserGroupV2',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

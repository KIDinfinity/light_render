// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/navigator/homepage/getProcessInfoByOrgMemberList */
export async function getProcessInfoByOrgMemberList(
  body: API.ProcessDefinitionStatusVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListUserProcessDefinitionVO>(
    '/api/navigator/homepage/getProcessInfoByOrgMemberList',
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

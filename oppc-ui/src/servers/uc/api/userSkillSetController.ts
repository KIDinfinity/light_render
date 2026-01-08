// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/uc/userSkill/findSkillByUserId */
export async function findSkillSetByUserId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findSkillSetByUserIdParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListUserSkillSetVO>(
    '/api/uc/userSkill/findSkillByUserId',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

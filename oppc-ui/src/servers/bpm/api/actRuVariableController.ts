// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/bpm/actruvariable/findUserIdByTaskId */
export async function findUserIdByTaskId1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findUserIdByTaskId1Params,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListActRuVariableVO>(
    '/api/bpm/actruvariable/findUserIdByTaskId',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

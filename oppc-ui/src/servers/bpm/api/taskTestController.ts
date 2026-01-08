// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/bpm/task/test/jp/createPostQc */
export async function createPostQc1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.createPostQc1Params,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOCaseTaskVO>('/api/bpm/task/test/jp/createPostQc', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

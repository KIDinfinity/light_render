// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/evy/sync/syncThEnvoy */
export async function syncEnvoy(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.syncEnvoyParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/evy/sync/syncThEnvoy', {
    method: 'POST',
    params: {
      // envoyCodePrefix has a default value: TH
      envoyCodePrefix: 'TH',
      ...params,
    },
    ...(options || {}),
  });
}

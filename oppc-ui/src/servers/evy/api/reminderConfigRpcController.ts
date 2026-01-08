// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /rpc/evy/reminder/config/findByCode */
export async function findByCode(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findByCodeParams,
  options?: { [key: string]: any },
) {
  return request<API.ReminderConfigDO>('/rpc/evy/reminder/config/findByCode', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

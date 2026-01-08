// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/pc/syncProductInfo */
export async function syncProductInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.syncProductInfoParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>('/api/pc/syncProductInfo', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/pc/syncProductPackage */
export async function syncProductPackage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.syncProductPackageParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>('/api/pc/syncProductPackage', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

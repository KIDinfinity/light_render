// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/integration/ods/ods/getInsuredInfo */
export async function getInsuredInfo1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getInsuredInfo1Params,
  body: API.JSONObject,
  options?: { [key: string]: any },
) {
  return request<API.JSONObject>('/api/integration/ods/ods/getInsuredInfo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      ...params,
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/integration/ods/ods/setOdsMockData */
export async function setOdsMockData1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.setOdsMockData1Params,
  body: string,
  options?: { [key: string]: any },
) {
  return request<any>('/api/integration/ods/ods/setOdsMockData', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      ...params,
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/integration/ods/ods/getInsuredInfo */
export async function getInsuredInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getInsuredInfoParams,
  body: API.JSONObject,
  options?: { [key: string]: any },
) {
  return request<API.JSONObject>('/rpc/integration/ods/ods/getInsuredInfo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      ...params,
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/integration/ods/ods/setOdsMockData */
export async function setOdsMockData(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.setOdsMockDataParams,
  body: string,
  options?: { [key: string]: any },
) {
  return request<any>('/rpc/integration/ods/ods/setOdsMockData', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      ...params,
    },
    data: body,
    ...(options || {}),
  });
}

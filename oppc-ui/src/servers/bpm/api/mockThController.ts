// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/bpm/th/mock/sendCaseRegistrationInitQueue */
export async function mockSendCaseRegistrationInitQueue(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.mockSendCaseRegistrationInitQueueParams,
  options?: { [key: string]: any },
) {
  return request<any>('/api/bpm/th/mock/sendCaseRegistrationInitQueue', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/th/mock/sendQueue */
export async function mockSendQueue(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.mockSendQueueParams,
  options?: { [key: string]: any },
) {
  return request<any>('/api/bpm/th/mock/sendQueue', {
    method: 'POST',
    params: {
      // addSuffix has a default value: true
      addSuffix: 'true',
      ...params,
    },
    ...(options || {}),
  });
}

// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /rpc/bpm/message/getQueueMessageBySubmissionId */
export async function getQueueMessageBySubmissionId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getQueueMessageBySubmissionIdParams,
  options?: { [key: string]: any },
) {
  return request<string>('/rpc/bpm/message/getQueueMessageBySubmissionId', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/message/sendCaseRegistrationRequestQueue */
export async function createCaseRegistrationRequestQueue(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.createCaseRegistrationRequestQueueParams,
  options?: { [key: string]: any },
) {
  return request<any>('/rpc/bpm/message/sendCaseRegistrationRequestQueue', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

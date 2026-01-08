// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/integration/v2/openIntegrationMock */
export async function openIntegrationMock(
  body: API.IntegrationOpenMockVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/integration/v2/openIntegrationMock', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/integration/v2/setMockResponseData */
export async function setMockResponseData(
  body: API.IntegrationMockResponseVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/integration/v2/setMockResponseData', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

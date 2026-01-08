// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/evy/autoWakeUp */
export async function autoWakeUp(
  body: API.BusinessRequestVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOAutoWakeUpResultVO>('/api/evy/autoWakeUp', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/evy/batchAutoWakeUp */
export async function batchAutoWakeUp(
  body: API.BatchRequestVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOBatchAutoWakeUpResultVO>(
    '/api/evy/batchAutoWakeUp',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/evy/manualSupplementBatchAutoWakeUpTableDatas */
export async function manualSupplementBatchAutoWakeUpTableDatas(
  options?: {
    [key: string]: any;
  },
) {
  return request<API.ResultVOVoid>(
    '/api/evy/manualSupplementBatchAutoWakeUpTableDatas',
    {
      method: 'POST',
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/evy/unknownDocCaseTriggerAutoWakeUp */
export async function unknownDocCaseTriggerAutoWakeUp(
  body: API.UdCaseVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOUdCaseResultVO>(
    '/api/evy/unknownDocCaseTriggerAutoWakeUp',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/navigator/cases/info/getCategoryReasonV2 */
export async function getCategoryReasonV2(
  body: API.CategoryReasonParam,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListInfoReasonType>(
    '/api/navigator/cases/info/getCategoryReasonV2',
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

/** 此处后端没有提供注释 POST /api/navigator/cases/info/getCategroyReason */
export async function getCategroyReason(
  body: API.CategoryReasonParam,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOInfoReasonType>(
    '/api/navigator/cases/info/getCategroyReason',
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

/** 此处后端没有提供注释 POST /api/navigator/cases/info/saveInformation */
export async function saveInformation4(
  body: API.InformationVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOInformationVO>(
    '/api/navigator/cases/info/saveInformation',
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

/** 此处后端没有提供注释 POST /api/navigator/cases/info/submitValidation */
export async function submitValidation(
  body: API.CheckInfoParam,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/navigator/cases/info/submitValidation', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

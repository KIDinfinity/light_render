// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /rpc/navigator/cases/create */
export async function create1(
  body: API.CaseCreationVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/rpc/navigator/cases/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/navigator/cases/splitCase */
export async function splitCase(
  body: API.CaseSubmitVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/rpc/navigator/cases/splitCase', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/navigator/cases/submit */
export async function submit(
  body: API.CaseSubmitVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/rpc/navigator/cases/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/navigator/cases/thHospitalBatchAutoSubmit */
export async function thHospitalBatchAutoSubmit(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>(
    '/rpc/navigator/cases/thHospitalBatchAutoSubmit',
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

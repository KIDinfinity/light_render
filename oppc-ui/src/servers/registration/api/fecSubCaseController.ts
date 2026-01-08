// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/registration/fecSubCase/create */
export async function create3(
  body: API.CaseCreationVOObject,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOCaseCreateResultVO>(
    '/api/registration/fecSubCase/create',
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

/** 此处后端没有提供注释 POST /api/registration/fecSubCase/inquiry */
export async function inquiry(
  body: API.InquiryParamVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOInquiryResultVO>(
    '/api/registration/fecSubCase/inquiry',
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

/** 此处后端没有提供注释 POST /api/registration/fecSubCase/submitFirstApproval */
export async function submitFirstApproval(
  body: API.CaseSubmitVOFecCaseInfo,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>(
    '/api/registration/fecSubCase/submitFirstApproval',
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

/** 此处后端没有提供注释 POST /api/registration/fecSubCase/submitSecondApproval */
export async function submitSecondApproval(
  body: API.CaseSubmitVOFecCaseInfo,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>(
    '/api/registration/fecSubCase/submitSecondApproval',
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

/** 此处后端没有提供注释 POST /api/registration/fecSubCase/updateFecDetail */
export async function updateFecDetail(
  body: API.CaseSubmitVOFecCaseInfo,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOFecCaseInfo>(
    '/api/registration/fecSubCase/updateFecDetail',
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

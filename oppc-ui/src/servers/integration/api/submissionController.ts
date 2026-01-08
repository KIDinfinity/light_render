// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/integration/submission/checkIfDocIsExpired */
export async function checkIfDocIsExpired(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListDocExpiredVO>(
    '/api/integration/submission/checkIfDocIsExpired',
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

/** 此处后端没有提供注释 POST /api/integration/submission/deleteFileList */
export async function deleteFileList(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>(
    '/api/integration/submission/deleteFileList',
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

/** 此处后端没有提供注释 POST /api/integration/submission/inquiryNbNoRetrySubmissionCase */
export async function inquiryNbNoRetrySubmissionCase(
  body: API.Page,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOPageIntegrationAsyncSubmissionDataVO>(
    '/api/integration/submission/inquiryNbNoRetrySubmissionCase',
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

/** 此处后端没有提供注释 POST /api/integration/submission/retryNbSubmissionCase */
export async function retryNbSubmissionCase(
  body: API.Page,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>(
    '/api/integration/submission/retryNbSubmissionCase',
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

/** 此处后端没有提供注释 POST /api/integration/submission/saveDocData */
export async function saveDocData(
  body: Record,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOString>(
    '/api/integration/submission/saveDocData',
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

/** 此处后端没有提供注释 POST /api/integration/submission/saveDocFile */
export async function saveDocFile(body: {}, options?: { [key: string]: any }) {
  return request<API.ResultVOString>(
    '/api/integration/submission/saveDocFile',
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

/** 此处后端没有提供注释 POST /api/integration/submission/submitRequest */
export async function receiveData(
  body: API.SubmissionDataVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOCaseCreateResultVO>(
    '/api/integration/submission/submitRequest',
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

/** 此处后端没有提供注释 POST /api/integration/submission/validateIfDocIsExpired */
export async function validateIfDocIsExpired(
  body: API.GeneralSubmissionVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>(
    '/api/integration/submission/validateIfDocIsExpired',
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

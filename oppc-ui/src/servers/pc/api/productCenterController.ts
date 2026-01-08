// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/pc/v2/autoAttachRiders */
export async function autoAttachRiders(
  body: API.QuotationRequestVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOQuotationRequestVO>(
    '/api/pc/v2/autoAttachRiders',
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

/** 此处后端没有提供注释 POST /api/pc/v2/deleteSIDoc */
export async function deleteSiDoc(
  body: API.OperateSIDocRequestVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVODeleteSIDocResponseVO>('/api/pc/v2/deleteSIDoc', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/pc/v2/quotation */
export async function quotation(
  body: API.QuotationRequestVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOQuotationResponseVO>('/api/pc/v2/quotation', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/pc/v2/retrieveSIDoc */
export async function retrieveSiDoc(
  body: API.OperateSIDocRequestVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVORetrieveSIDocResponseVO>(
    '/api/pc/v2/retrieveSIDoc',
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

/** 此处后端没有提供注释 POST /api/pc/v2/retrieveSIToken */
export async function retrieveSiToken(
  body: API.RetrieveSITokenRequestVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOQuotationResponseVO>(
    '/api/pc/v2/retrieveSIToken',
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

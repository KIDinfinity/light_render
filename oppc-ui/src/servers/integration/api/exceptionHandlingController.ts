// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/integration/exceptionHandling/fireFightingSubmit */
export async function fireFightingSubmit(
  body: API.SubmitInputVOExceptionHandlingDataVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOSubmitOutputVO>(
    '/api/integration/exceptionHandling/fireFightingSubmit',
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

/** 此处后端没有提供注释 POST /api/integration/exceptionHandling/getErrorCodeByCategory */
export async function getErrorCodeByCategory(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVOMapStringListErrorCodeMessageCodeVO>(
    '/api/integration/exceptionHandling/getErrorCodeByCategory',
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

/** 此处后端没有提供注释 POST /api/integration/exceptionHandling/getExceptionHandlingData */
export async function getExceptionHandlerData(
  body: API.InquiryParamVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOInquiryResultVO>(
    '/api/integration/exceptionHandling/getExceptionHandlingData',
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

/** 此处后端没有提供注释 POST /api/integration/exceptionHandling/getExternalErrorMsgList */
export async function getExternalErrorMsgList(
  body: Record,
  options?: { [key: string]: any },
) {
  return request<API.IntegrationExternalSystemErrorMsgDO[]>(
    '/api/integration/exceptionHandling/getExternalErrorMsgList',
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

/** 此处后端没有提供注释 POST /api/integration/exceptionHandling/getProcessDetail */
export async function getProcessDetail(
  body: Record,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOIntegrationProcessDO>(
    '/api/integration/exceptionHandling/getProcessDetail',
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

/** 此处后端没有提供注释 POST /api/integration/exceptionHandling/identificationSubmit */
export async function identificationSubmit(
  body: API.SubmitInputVOExceptionHandlingDataVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOSubmitOutputVO>(
    '/api/integration/exceptionHandling/identificationSubmit',
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

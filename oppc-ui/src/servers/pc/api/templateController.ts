// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/pc/template/combineHtmlTemplateAndData */
export async function combineHtmlTemplateAndData(
  body: API.RequestVO,
  options?: { [key: string]: any },
) {
  return request<API.ResponseVOObject>(
    '/api/pc/template/combineHtmlTemplateAndData',
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

/** 此处后端没有提供注释 POST /api/pc/template/generateHtmlByConfig */
export async function generateHtml(
  body: API.RequestVO,
  options?: { [key: string]: any },
) {
  return request<API.ResponseVOObject>(
    '/api/pc/template/generateHtmlByConfig',
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

/** 此处后端没有提供注释 POST /api/pc/template/generateHtmlByPid */
export async function generateHtmlByPid(
  body: API.RequestVO,
  options?: { [key: string]: any },
) {
  return request<API.ResponseVOObject>('/api/pc/template/generateHtmlByPid', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/pc/template/generatePDF */
export async function generatePdf(
  body: API.RequestVO,
  options?: { [key: string]: any },
) {
  return request<API.ResponseVOObject>('/api/pc/template/generatePDF', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/pc/template/splitHtml */
export async function splitHtml(
  body: API.RequestVO,
  options?: { [key: string]: any },
) {
  return request<API.ResponseVOObject>('/api/pc/template/splitHtml', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

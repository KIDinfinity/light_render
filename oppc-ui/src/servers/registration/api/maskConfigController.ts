// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/registration/logMask/addLoggerName */
export async function addLoggerName(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.MaskLogConfig>('/api/registration/logMask/addLoggerName', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/registration/logMask/addMaskFields */
export async function addMaskFields(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.MaskLogConfig>('/api/registration/logMask/addMaskFields', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/registration/logMask/closeMask */
export async function closeMask(options?: { [key: string]: any }) {
  return request<API.MaskLogConfig>('/api/registration/logMask/closeMask', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/registration/logMask/getMaskCofing */
export async function getMaskCofing(options?: { [key: string]: any }) {
  return request<API.MaskLogConfig>('/api/registration/logMask/getMaskCofing', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/registration/logMask/openMask */
export async function openMask(options?: { [key: string]: any }) {
  return request<API.MaskLogConfig>('/api/registration/logMask/openMask', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/registration/logMask/setLoggerNames */
export async function setLoggerNames(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.MaskLogConfig>(
    '/api/registration/logMask/setLoggerNames',
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

/** 此处后端没有提供注释 POST /api/registration/logMask/setMaskFields */
export async function setMaskFields(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.MaskLogConfig>('/api/registration/logMask/setMaskFields', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

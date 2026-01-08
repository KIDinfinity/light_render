// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/misc/logMask/addLoggerName */
export async function addLoggerName(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.MaskLogConfig>('/api/misc/logMask/addLoggerName', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/misc/logMask/addMaskFields */
export async function addMaskFields(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.MaskLogConfig>('/api/misc/logMask/addMaskFields', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/misc/logMask/closeMask */
export async function closeMask(options?: { [key: string]: any }) {
  return request<API.MaskLogConfig>('/api/misc/logMask/closeMask', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/misc/logMask/getMaskCofing */
export async function getMaskCofing(options?: { [key: string]: any }) {
  return request<API.MaskLogConfig>('/api/misc/logMask/getMaskCofing', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/misc/logMask/openMask */
export async function openMask(options?: { [key: string]: any }) {
  return request<API.MaskLogConfig>('/api/misc/logMask/openMask', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/misc/logMask/setLoggerNames */
export async function setLoggerNames(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.MaskLogConfig>('/api/misc/logMask/setLoggerNames', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/misc/logMask/setMaskFields */
export async function setMaskFields(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.MaskLogConfig>('/api/misc/logMask/setMaskFields', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

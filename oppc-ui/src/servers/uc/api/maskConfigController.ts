// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/uc/logMask/addLoggerName */
export async function addLoggerName(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.MaskLogConfig>('/api/uc/logMask/addLoggerName', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/uc/logMask/addMaskFields */
export async function addMaskFields(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.MaskLogConfig>('/api/uc/logMask/addMaskFields', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/uc/logMask/closeMask */
export async function closeMask(options?: { [key: string]: any }) {
  return request<API.MaskLogConfig>('/api/uc/logMask/closeMask', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/uc/logMask/getMaskCofing */
export async function getMaskCofing(options?: { [key: string]: any }) {
  return request<API.MaskLogConfig>('/api/uc/logMask/getMaskCofing', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/uc/logMask/openMask */
export async function openMask(options?: { [key: string]: any }) {
  return request<API.MaskLogConfig>('/api/uc/logMask/openMask', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/uc/logMask/setLoggerNames */
export async function setLoggerNames(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.MaskLogConfig>('/api/uc/logMask/setLoggerNames', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/uc/logMask/setMaskFields */
export async function setMaskFields(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.MaskLogConfig>('/api/uc/logMask/setMaskFields', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

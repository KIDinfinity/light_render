// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/bpm/logMask/addLoggerName */
export async function addLoggerName(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.MaskLogConfig>('/api/bpm/logMask/addLoggerName', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/logMask/addMaskFields */
export async function addMaskFields(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.MaskLogConfig>('/api/bpm/logMask/addMaskFields', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/logMask/closeMask */
export async function closeMask(options?: { [key: string]: any }) {
  return request<API.MaskLogConfig>('/api/bpm/logMask/closeMask', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/logMask/getMaskCofing */
export async function getMaskCofing(options?: { [key: string]: any }) {
  return request<API.MaskLogConfig>('/api/bpm/logMask/getMaskCofing', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/logMask/openMask */
export async function openMask(options?: { [key: string]: any }) {
  return request<API.MaskLogConfig>('/api/bpm/logMask/openMask', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/logMask/setLoggerNames */
export async function setLoggerNames(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.MaskLogConfig>('/api/bpm/logMask/setLoggerNames', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/logMask/setMaskFields */
export async function setMaskFields(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.MaskLogConfig>('/api/bpm/logMask/setMaskFields', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

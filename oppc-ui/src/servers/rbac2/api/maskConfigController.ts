// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/rbac2/logMask/addLoggerName */
export async function addLoggerName(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.MaskLogConfig>('/api/rbac2/logMask/addLoggerName', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/rbac2/logMask/addMaskFields */
export async function addMaskFields(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.MaskLogConfig>('/api/rbac2/logMask/addMaskFields', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/rbac2/logMask/closeMask */
export async function closeMask(options?: { [key: string]: any }) {
  return request<API.MaskLogConfig>('/api/rbac2/logMask/closeMask', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/rbac2/logMask/getMaskCofing */
export async function getMaskCofing(options?: { [key: string]: any }) {
  return request<API.MaskLogConfig>('/api/rbac2/logMask/getMaskCofing', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/rbac2/logMask/openMask */
export async function openMask(options?: { [key: string]: any }) {
  return request<API.MaskLogConfig>('/api/rbac2/logMask/openMask', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/rbac2/logMask/setLoggerNames */
export async function setLoggerNames(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.MaskLogConfig>('/api/rbac2/logMask/setLoggerNames', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/rbac2/logMask/setMaskFields */
export async function setMaskFields(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.MaskLogConfig>('/api/rbac2/logMask/setMaskFields', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

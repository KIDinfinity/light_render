// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/pc/config/downloadJson */
export async function configDownloadJson(
  body: API.RequestVO,
  options?: { [key: string]: any },
) {
  return request<string>('/api/pc/config/downloadJson', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/pc/config/downloadMachineZip */
export async function downloadMachineZip(
  body: API.RequestVO,
  options?: { [key: string]: any },
) {
  return request<string>('/api/pc/config/downloadMachineZip', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/pc/config/downloadZip */
export async function configDownloadZip(
  body: API.RequestVO,
  options?: { [key: string]: any },
) {
  return request<string>('/api/pc/config/downloadZip', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/pc/config/uploadJson */
export async function configUploadJson(
  body: {},
  options?: { [key: string]: any },
) {
  return request<API.ResponseVOVoid>('/api/pc/config/uploadJson', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

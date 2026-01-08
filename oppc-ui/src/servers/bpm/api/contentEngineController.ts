// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/bpm/contentService/readContent */
export async function readContent(
  body: API.FileContent,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOProcessInfoVO>(
    '/api/bpm/contentService/readContent',
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

/** 此处后端没有提供注释 POST /api/bpm/contentService/saveContent */
export async function saveContent(
  body: API.FileContent,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOProcessInfoVO>(
    '/api/bpm/contentService/saveContent',
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

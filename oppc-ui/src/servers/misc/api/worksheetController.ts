// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/navigator/worksheet/downloadWorksheet */
export async function downloadWorksheet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.downloadWorksheetParams,
  options?: { [key: string]: any },
) {
  return request<string>('/api/navigator/worksheet/downloadWorksheet', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/navigator/worksheet/isShowUploadButton */
export async function isShowUploadButton(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.isShowUploadButtonParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOBoolean>(
    '/api/navigator/worksheet/isShowUploadButton',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/navigator/worksheet/uploadWorksheet */
export async function uploadWorksheet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.uploadWorksheetParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>('/api/navigator/worksheet/uploadWorksheet', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

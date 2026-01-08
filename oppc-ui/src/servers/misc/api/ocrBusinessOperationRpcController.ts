// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /rpc/navigator/ocr/doBusinessOperation */
export async function doBusinessOperation(
  body: API.OcrConversionRequestVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOOcrConversionResponseVOObject>(
    '/rpc/navigator/ocr/doBusinessOperation',
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

/** 此处后端没有提供注释 POST /rpc/navigator/ocr/updateBusinessDataByOCR */
export async function updateBusinessDataByOcr(
  body: API.CaseSubmitVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/rpc/navigator/ocr/updateBusinessDataByOCR', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

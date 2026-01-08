// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/registration/van/getPolicyNoByCaseNo */
export async function getPolicyNoByCaseNo(
  body: API.InquiryParamVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOString>(
    '/api/registration/van/getPolicyNoByCaseNo',
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

/** 此处后端没有提供注释 POST /api/registration/van/getVanCase */
export async function getVanCase(
  body: API.InquiryParamVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOInquiryResultVO>(
    '/api/registration/van/getVanCase',
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

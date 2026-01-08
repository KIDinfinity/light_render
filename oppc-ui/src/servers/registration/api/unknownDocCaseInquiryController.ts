// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/registration/ud/inquiry/getUnknownDocCase */
export async function getUnknownDocCase(
  body: API.CaseInquiryParamVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOCaseInquiryResultVOObject>(
    '/api/registration/ud/inquiry/getUnknownDocCase',
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

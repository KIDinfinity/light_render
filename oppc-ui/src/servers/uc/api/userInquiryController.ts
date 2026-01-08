// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/uc/userInquiry/advancedQuery */
export async function advancedQuery1(
  body: API.Page,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOPageUserInquiryDO>(
    '/api/uc/userInquiry/advancedQuery',
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

/** 此处后端没有提供注释 POST /api/uc/userInquiry/fuzzyQuery */
export async function fuzzyQuery(
  body: API.PageUserInquiryDO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOPageUserInquiryDO>(
    '/api/uc/userInquiry/fuzzyQuery',
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

/** 此处后端没有提供注释 POST /api/uc/userInquiry/listByRoleCode */
export async function listUserInfoByRoleCode1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listUserInfoByRoleCode1Params,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListUserInquiryDO>(
    '/api/uc/userInquiry/listByRoleCode',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

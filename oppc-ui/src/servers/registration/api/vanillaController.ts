// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/registration/vanilla/case/cancel */
export async function cancel(
  body: API.CaseCancellationVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/registration/vanilla/case/cancel', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/registration/vanilla/case/create */
export async function create(
  body: API.CaseCreationVOVanillaCaseVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOCaseCreateResultVO>(
    '/api/registration/vanilla/case/create',
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

/** 此处后端没有提供注释 POST /api/registration/vanilla/case/submit */
export async function submit(
  body: API.CaseSubmitVOVanillaCaseVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOSubmitCaseResultVOObject>(
    '/api/registration/vanilla/case/submit',
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

/** 此处后端没有提供注释 POST /api/registration/vanilla/inquiry/getVanillaCaseInfo */
export async function getVanillaCaseInfo(
  body: API.InquiryParamVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOInquiryResultVO>(
    '/api/registration/vanilla/inquiry/getVanillaCaseInfo',
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

/** 此处后端没有提供注释 POST /api/registration/vanilla/inquiry/getVanillaCaseInfoByBusinessNo */
export async function getVanillaCaseInfoByBusinessNo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getVanillaCaseInfoByBusinessNoParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVanillaCaseDO>(
    '/api/registration/vanilla/inquiry/getVanillaCaseInfoByBusinessNo',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

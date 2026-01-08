// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/navigator/claim/getClaimProcess */
export async function getClaimProcess1(
  body: API.ClaimProgressRequestVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOClaimProgressResponseVO>(
    '/api/navigator/claim/getClaimProcess',
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

/** 此处后端没有提供注释 POST /api/navigator/claim/getClaimProcessList */
export async function getClaimProcessList1(
  body: API.ClaimProgressRequestListVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOCaseDetailList>(
    '/api/navigator/claim/getClaimProcessList',
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

/** 此处后端没有提供注释 POST /api/navigator/claim/queryMainCaseForPostProcessing */
export async function queryMainCaseForPostProcessing1(
  body: API.BaseInfoParam,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOCaseBusinessVO>(
    '/api/navigator/claim/queryMainCaseForPostProcessing',
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

/** 此处后端没有提供注释 POST /api/navigator/claim/updateNonOpusClaim */
export async function updateNonOpusClaim1(
  body: Record,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/navigator/claim/updateNonOpusClaim', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/navigator/claim/getClaimProcess */
export async function getClaimProcess(
  body: API.ClaimProgressRequestVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOClaimProgressResponseVO>(
    '/rpc/navigator/claim/getClaimProcess',
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

/** 此处后端没有提供注释 POST /rpc/navigator/claim/getClaimProcessList */
export async function getClaimProcessList(
  body: API.ClaimProgressRequestListVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOCaseDetailList>(
    '/rpc/navigator/claim/getClaimProcessList',
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

/** 此处后端没有提供注释 POST /rpc/navigator/claim/queryMainCaseForPostProcessing */
export async function queryMainCaseForPostProcessing(
  body: API.BaseInfoParam,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOCaseBusinessVO>(
    '/rpc/navigator/claim/queryMainCaseForPostProcessing',
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

/** 此处后端没有提供注释 POST /rpc/navigator/claim/updateNonOpusClaim */
export async function updateNonOpusClaim(
  body: Record,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/rpc/navigator/claim/updateNonOpusClaim', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

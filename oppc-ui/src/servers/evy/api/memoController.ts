// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 GET /api/evy/memo/evictMemoDropdownCache */
export async function evictMemoDropdownCache(options?: { [key: string]: any }) {
  return request<API.ResultVO>('/api/evy/memo/evictMemoDropdownCache', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/evy/memo/findByReasonCodeAndStatus */
export async function findByReasonCodeAndStatus(
  body: API.MemoClientRequest,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListReasonGroupPendingMemoVO>(
    '/api/evy/memo/findByReasonCodeAndStatus',
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

/** 此处后端没有提供注释 POST /api/evy/memo/getMemoSubTypeList */
export async function getMemoSubTypeList(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListMemoSubTypeDO>(
    '/api/evy/memo/getMemoSubTypeList',
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

/** 此处后端没有提供注释 POST /api/evy/memo/getMemoSubTypeListV2 */
export async function getMemoSubTypeListV2(
  body: API.MemoSubInfoRequest,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListMemoSubTypeDO>(
    '/api/evy/memo/getMemoSubTypeListV2',
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

/** 此处后端没有提供注释 POST /api/evy/memo/listDefaultMemo */
export async function listDefaultMemo(
  body: API.MemoConfigRequest,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListPendingMemoConfigVO>(
    '/api/evy/memo/listDefaultMemo',
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

/** 此处后端没有提供注释 POST /api/evy/memo/listMemoByCaseCategoryAndActivityKey */
export async function listMemoByBizCode(
  body: API.MemoConfigRequest,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListPendingMemoConfigVO>(
    '/api/evy/memo/listMemoByCaseCategoryAndActivityKey',
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

/** 此处后端没有提供注释 GET /api/evy/memo/listMemos */
export async function listMemos(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listMemosParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListPendingMemoConfigVO>(
    '/api/evy/memo/listMemos',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/evy/memo/listRequestClientInfo */
export async function listRequestClientInfo(
  body: API.MemoClientRequest,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListMemoRequestedClientInfoDTO>(
    '/api/evy/memo/listRequestClientInfo',
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

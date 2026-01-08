// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /rpc/navigator/info/cleanNotice */
export async function cleanNotice(
  body: API.BaseInfoParam,
  options?: { [key: string]: any },
) {
  return request<any>('/rpc/navigator/info/cleanNotice', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/navigator/info/findBusinessCheckInfo */
export async function findBusinessCheckInfo(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.InformationReferenceVO[]>(
    '/rpc/navigator/info/findBusinessCheckInfo',
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

/** 此处后端没有提供注释 POST /rpc/navigator/info/refreshNotices */
export async function refreshNotices(
  body: API.InformationVO[],
  options?: { [key: string]: any },
) {
  return request<any>('/rpc/navigator/info/refreshNotices', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/navigator/info/saveBatch */
export async function saveBatch(
  body: API.InformationVO[],
  options?: { [key: string]: any },
) {
  return request<any>('/rpc/navigator/info/saveBatch', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/navigator/info/saveBatchInformationReference */
export async function saveBatchInformationReference(
  body: API.InformationReferenceBatchVO,
  options?: { [key: string]: any },
) {
  return request<any>('/rpc/navigator/info/saveBatchInformationReference', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/navigator/info/saveBatchLinkTo */
export async function saveBatchLinkTo(
  body: API.InformationLinkToDO[],
  options?: { [key: string]: any },
) {
  return request<any>('/rpc/navigator/info/saveBatchLinkTo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/navigator/info/saveLinkToCaseByDocumentIds */
export async function saveLinkToCaseByDocumentIds(
  body: API.LinkToCaseParam,
  options?: { [key: string]: any },
) {
  return request<any>('/rpc/navigator/info/saveLinkToCaseByDocumentIds', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

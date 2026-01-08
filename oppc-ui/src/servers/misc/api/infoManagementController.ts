// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/navigator/info/360/remarks */
export async function getRemarks(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getRemarksParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListRemark360DO>(
    '/api/navigator/info/360/remarks',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/navigator/info/batchSave */
export async function batchSave(
  body: API.InformationVO[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVOBoolean>('/api/navigator/info/batchSave', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/navigator/info/checkBeforeReject */
export async function checkBeforeReject(
  body: API.BaseInfoParam,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOBoolean>('/api/navigator/info/checkBeforeReject', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/navigator/info/checkBeforeSubmit */
export async function checkBeforeSubmit(
  body: API.BaseInfoParam,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOBoolean>('/api/navigator/info/checkBeforeSubmit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/navigator/info/deleteDataAfterReject */
export async function deleteDataAfterReject(
  body: API.BaseInfoParam,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>(
    '/api/navigator/info/deleteDataAfterReject',
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

/** 此处后端没有提供注释 POST /api/navigator/info/deleteDataAfterSubmit */
export async function deleteDataAfterSubmit(
  body: API.BaseInfoParam,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>(
    '/api/navigator/info/deleteDataAfterSubmit',
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

/** 此处后端没有提供注释 POST /api/navigator/info/findInfoListByCondition */
export async function findInfoListByCondition(
  body: API.Page,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOPageInformationDO>(
    '/api/navigator/info/findInfoListByCondition',
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

/** 此处后端没有提供注释 POST /api/navigator/info/getClassification */
export async function getClassification(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getClassificationParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOInfoClassification>(
    '/api/navigator/info/getClassification',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/navigator/info/getDefaultActivityCode */
export async function getDefaultActivity(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getDefaultActivityParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOString>(
    '/api/navigator/info/getDefaultActivityCode',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/navigator/info/markInfoIsRead */
export async function markInfoIsRead(
  body: API.MarkInfoParam,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>('/api/navigator/info/markInfoIsRead', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/navigator/info/saveInformation */
export async function saveInformation3(
  body: API.InformationVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOInformationVO>(
    '/api/navigator/info/saveInformation',
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

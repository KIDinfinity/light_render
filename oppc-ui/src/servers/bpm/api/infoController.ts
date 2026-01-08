// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/bpm/info/allCategoryInformation */
export async function allCategoryInformation(
  body: Record,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListInformationCategoryVO>(
    '/api/bpm/info/allCategoryInformation',
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

/** 此处后端没有提供注释 POST /api/bpm/info/appealNoteInfoValidation */
export async function appealNoteInfoValidation(
  body: API.CheckInfoParam,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOButtonLinkCategoryResult>(
    '/api/bpm/info/appealNoteInfoValidation',
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

/** 此处后端没有提供注释 POST /api/bpm/info/checkBeforeReject */
export async function checkBeforeReject(
  body: API.BaseInfoParam,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOBoolean>('/api/bpm/info/checkBeforeReject', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/info/checkBeforeSubmit */
export async function checkBeforeSubmit(
  body: API.BaseInfoParam,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOBoolean>('/api/bpm/info/checkBeforeSubmit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/info/checkHasUnreadInfo */
export async function checkHasUnreadInfo(
  body: Record,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOBoolean>('/api/bpm/info/checkHasUnreadInfo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/info/deleteDataAfterSubmit */
export async function deleteDataAfterSubmit1(
  body: API.BaseInfoParam,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>('/api/bpm/info/deleteDataAfterSubmit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/info/existInfoByInquiryBusinessNoAndCategoryCode */
export async function existInfoByInquiryBusinessNoAndCategoryCode(
  body: Record,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOBoolean>(
    '/api/bpm/info/existInfoByInquiryBusinessNoAndCategoryCode',
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

/** 此处后端没有提供注释 POST /api/bpm/info/getCategroyReason */
export async function getCategroyReason1(
  body: API.CategoryReasonParam,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOInfoReasonType>(
    '/api/bpm/info/getCategroyReason',
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

/** 此处后端没有提供注释 POST /api/bpm/info/getCategroyReasonByList */
export async function getCategroyReasonByList(
  body: API.CategoryReasonListParam,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListInfoReasonType>(
    '/api/bpm/info/getCategroyReasonByList',
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

/** 此处后端没有提供注释 POST /api/bpm/info/getInfoCategoryByMessage */
export async function getInfoCategoryByMessage(
  body: API.CheckInfoParam,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOActivityCategoryLinkDO>(
    '/api/bpm/info/getInfoCategoryByMessage',
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

/** 此处后端没有提供注释 POST /api/bpm/info/getInformationGroups */
export async function getInformationGroups(
  body: API.CheckInfoParam,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOInformationGroupsVO>(
    '/api/bpm/info/getInformationGroups',
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

/** 此处后端没有提供注释 POST /api/bpm/info/markInfoIsRead */
export async function markInfoIsRead(
  body: API.MarkInfoParam,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>('/api/bpm/info/markInfoIsRead', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/info/markInformationRead */
export async function markInformationRead(
  body: Record,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>('/api/bpm/info/markInformationRead', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/info/pageInfo */
export async function findInfoListByCondition(
  body: API.PageInformationDO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOPageInformationDO>('/api/bpm/info/pageInfo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/info/postQcAppealValidation */
export async function postQcAppealValidation(
  body: API.CheckInfoParam,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOButtonLinkCategoryResult>(
    '/api/bpm/info/postQcAppealValidation',
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

/** 此处后端没有提供注释 POST /api/bpm/info/remarks */
export async function getRemarks(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getRemarksParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListRemark360DO>('/api/bpm/info/remarks', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/info/save */
export async function saveInformation1(
  body: API.InformationVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOInformationVO>('/api/bpm/info/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/info/sendEmail */
export async function sendEmail(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.sendEmailParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOBoolean>('/api/bpm/info/sendEmail', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/info/submitNoteInfoValidation */
export async function submitNoteInfoValidation(
  body: API.CheckInfoParam,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOButtonLinkCategoryResult>(
    '/api/bpm/info/submitNoteInfoValidation',
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

/** 此处后端没有提供注释 POST /api/bpm/info/submitValidation */
export async function submitValidation(
  body: API.CheckInfoParam,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOButtonLinkCategoryResult>(
    '/api/bpm/info/submitValidation',
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

/** 此处后端没有提供注释 POST /api/bpm/info/submitValidationInvestigation */
export async function submitValidationInvestigation(
  body: API.CheckInfoParam,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOButtonLinkCategoryResult>(
    '/api/bpm/info/submitValidationInvestigation',
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

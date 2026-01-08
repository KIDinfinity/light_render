// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/evy/correspondence/getAttachmentTemplateCodeList */
export async function getAttachmentList(
  body: API.GetAttachmentInfoListRequest,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListString>(
    '/api/evy/correspondence/getAttachmentTemplateCodeList',
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

/** 此处后端没有提供注释 POST /api/evy/correspondence/prepareAndSend */
export async function prepareAndSend(
  body: API.CorrespondenceEventVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOCorrespondenceEventVO>(
    '/api/evy/correspondence/prepareAndSend',
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

/** 此处后端没有提供注释 POST /api/evy/correspondence/reTrigger */
export async function reTrigger(
  body: API.CorrespondenceEventVO,
  options?: { [key: string]: any },
) {
  return request<any>('/api/evy/correspondence/reTrigger', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/evy/correspondence/reTriggerByCaseNo */
export async function reTriggerByCaseNo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.reTriggerByCaseNoParams,
  options?: { [key: string]: any },
) {
  return request<any>('/api/evy/correspondence/reTriggerByCaseNo', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/evy/correspondence/reTriggerByInquiryBusinessNoListAndReasonGroupCode */
export async function reTriggerByInquiryBusinessNoListAndReasonGroupCode(
  body: API.DataPatchRequestVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVODataPatchResultVO>(
    '/api/evy/correspondence/reTriggerByInquiryBusinessNoListAndReasonGroupCode',
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

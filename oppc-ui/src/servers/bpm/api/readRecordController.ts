// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/bpm/readrecord/addBizObjReadRecord */
export async function addBizObjReadRecord(
  body: API.BizObjReadRecordVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>('/api/bpm/readrecord/addBizObjReadRecord', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/readrecord/getCurrentAssigneeListByInquiryBusinessNo */
export async function getCurrentAssigneeListByInquiryBusinessNo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCurrentAssigneeListByInquiryBusinessNoParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListString>(
    '/api/bpm/readrecord/getCurrentAssigneeListByInquiryBusinessNo',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/bpm/readrecord/inquiryUserBizObjReadHistory */
export async function inquiryUserBizObjReadHistory(
  body: API.BizObjReadRecordRequestVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOBizObjReadRecordRequestVO>(
    '/api/bpm/readrecord/inquiryUserBizObjReadHistory',
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

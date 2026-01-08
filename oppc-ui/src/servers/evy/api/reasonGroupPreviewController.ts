// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/evy/ReasonGroupPreview/getCorrespondencePreviewData */
export async function getCorrespondencePreviewData1(
  body: API.ReasonGroupVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOCorrespondencePreviewVO>(
    '/api/evy/ReasonGroupPreview/getCorrespondencePreviewData',
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

/** 此处后端没有提供注释 POST /api/evy/ReasonGroupPreview/getReasonGroupPreviewData */
export async function getReasonGroupPreviewData3(
  body: string,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOReasonGroupPreviewDataVO>(
    '/api/evy/ReasonGroupPreview/getReasonGroupPreviewData',
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

/** 此处后端没有提供注释 POST /api/evy/ReasonGroupPreview/saveReasonGroupPreviewData */
export async function getReasonGroupPreviewData1(
  body: API.ReasonGroupPreviewDataVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOString>(
    '/api/evy/ReasonGroupPreview/saveReasonGroupPreviewData',
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

/** 此处后端没有提供注释 POST /rpc/evy/ReasonGroupPreview/getCorrespondencePreviewData */
export async function getCorrespondencePreviewData(
  body: API.ReasonGroupVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOCorrespondencePreviewVO>(
    '/rpc/evy/ReasonGroupPreview/getCorrespondencePreviewData',
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

/** 此处后端没有提供注释 POST /rpc/evy/ReasonGroupPreview/getReasonGroupPreviewData */
export async function getReasonGroupPreviewData2(
  body: string,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOReasonGroupPreviewDataVO>(
    '/rpc/evy/ReasonGroupPreview/getReasonGroupPreviewData',
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

/** 此处后端没有提供注释 POST /rpc/evy/ReasonGroupPreview/saveReasonGroupPreviewData */
export async function getReasonGroupPreviewData(
  body: API.ReasonGroupPreviewDataVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOString>(
    '/rpc/evy/ReasonGroupPreview/saveReasonGroupPreviewData',
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

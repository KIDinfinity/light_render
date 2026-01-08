// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/registration/paper/autoSubmit */
export async function autoSubmit(
  body: API.CaseSubmitVOPaperApplicationVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOSubmitCaseResultVOPaperApplicationVO>(
    '/api/registration/paper/autoSubmit',
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

/** 此处后端没有提供注释 POST /api/registration/paper/create */
export async function create1(
  body: API.CaseCreationVOObject,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOCaseCreateResultVO>(
    '/api/registration/paper/create',
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

/** 此处后端没有提供注释 POST /api/registration/paper/getApplicationData */
export async function getApplicationData(
  body: API.InquiryParamVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOInquiryResultVO>(
    '/api/registration/paper/getApplicationData',
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

/** 此处后端没有提供注释 POST /api/registration/paper/save */
export async function save1(
  body: API.CaseSubmitVOPaperApplicationVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOSubmitCaseResultVOPaperApplicationVO>(
    '/api/registration/paper/save',
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

/** 此处后端没有提供注释 POST /api/registration/paper/submit */
export async function submit2(
  body: API.CaseSubmitVOPaperApplicationVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOSubmitCaseResultVOPaperApplicationVO>(
    '/api/registration/paper/submit',
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

/** 此处后端没有提供注释 POST /api/registration/paper/submitValidate */
export async function submitValidate(
  body: API.CaseSubmitVOPaperApplicationVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListExceptionMessage>(
    '/api/registration/paper/submitValidate',
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

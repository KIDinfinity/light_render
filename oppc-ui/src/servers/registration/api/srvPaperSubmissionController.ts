// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/registration/srv/paper/create/manualCreatePaper */
export async function manualCreatePaper(
  body: API.CaseBusinessVOSrvCaseVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOCaseBusinessResultVO>(
    '/api/registration/srv/paper/create/manualCreatePaper',
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

/** 此处后端没有提供注释 POST /api/registration/srv/paper/inquiry/getSrvCase */
export async function getSrvCase(
  body: API.CaseInquiryParamVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOCaseInquiryResultVOObject>(
    '/api/registration/srv/paper/inquiry/getSrvCase',
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

/** 此处后端没有提供注释 POST /api/registration/srv/paper/submit/submitPaperAutoSubmission */
export async function submitPaperAutoSubmission(
  body: API.CaseBusinessVOSrvCaseVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOCaseBusinessResultVO>(
    '/api/registration/srv/paper/submit/submitPaperAutoSubmission',
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

/** 此处后端没有提供注释 POST /api/registration/srv/paper/submit/submitPaperDataCapture */
export async function submitPaperDataCapture(
  body: API.CaseBusinessVOSrvCaseVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOCaseBusinessResultVO>(
    '/api/registration/srv/paper/submit/submitPaperDataCapture',
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

/** 此处后端没有提供注释 POST /api/registration/srv/paper/submit/submitPaperDataVerification */
export async function submitPaperDataVerification(
  body: API.CaseBusinessVOSrvCaseVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOCaseBusinessResultVO>(
    '/api/registration/srv/paper/submit/submitPaperDataVerification',
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

/** 此处后端没有提供注释 POST /api/registration/srv/paper/submit/submitPreChecking */
export async function submitPreChecking(
  body: API.CaseBusinessVOSrvCaseVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOCaseBusinessResultVO>(
    '/api/registration/srv/paper/submit/submitPreChecking',
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

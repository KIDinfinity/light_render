// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/registration/medicalCheck/appointmentDate/reject */
export async function appointmentDateReject(
  body: API.MedicalCheckCaseVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>(
    '/api/registration/medicalCheck/appointmentDate/reject',
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

/** 此处后端没有提供注释 POST /api/registration/medicalCheck/case/create */
export async function create2(
  body: API.CaseCreationVOMedicalCheckCaseVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOCaseCreateResultVO>(
    '/api/registration/medicalCheck/case/create',
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

/** 此处后端没有提供注释 POST /api/registration/medicalCheck/case/submit */
export async function submit3(
  body: API.CaseSubmitVOMedicalCheckCaseVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOCaseCreateResultVO>(
    '/api/registration/medicalCheck/case/submit',
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

/** 此处后端没有提供注释 POST /api/registration/medicalCheck/hospitalCategory/confirm */
export async function hospitalCategoryConfirm(
  body: API.FurtherRequirement,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>(
    '/api/registration/medicalCheck/hospitalCategory/confirm',
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

/** 此处后端没有提供注释 POST /api/registration/medicalCheck/inquiry/getMedicalCheckCaseInfo */
export async function getMedicalCheckCaseInfo(
  body: API.InquiryParamVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOInquiryResultVO>(
    '/api/registration/medicalCheck/inquiry/getMedicalCheckCaseInfo',
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

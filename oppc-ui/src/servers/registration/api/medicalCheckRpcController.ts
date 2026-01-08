// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /rpc/registration/medicalCheck/clinicAppointment */
export async function receiveDataToCreateNewCase2(
  body: API.AutoWakeUpRequestVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>(
    '/rpc/registration/medicalCheck/clinicAppointment',
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

/** 此处后端没有提供注释 POST /rpc/registration/medicalCheck/getExistMedicalCase */
export async function getExistMedicalCase(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getExistMedicalCaseParams,
  options?: { [key: string]: any },
) {
  return request<string>('/rpc/registration/medicalCheck/getExistMedicalCase', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/registration/medicalCheck/validate */
export async function sendMedicalEnvoyValidate(
  body: API.BusinessValidationVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/rpc/registration/medicalCheck/validate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/integration/ods/getHosBillPaymentInfo */
export async function getHosBillPaymentInfo(
  body: API.FetchHosBillPaymentInfoParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOHospitalBillPaymentInfoResponse>(
    '/api/integration/ods/getHosBillPaymentInfo',
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

/** 此处后端没有提供注释 POST /api/integration/ods/getMockHosBillPaymentInfo */
export async function getMockHosBillPaymentInfo(
  body: API.FetchHosBillPaymentInfoParams,
  options?: { [key: string]: any },
) {
  return request<API.HospitalBillPaymentInfoResponse>(
    '/api/integration/ods/getMockHosBillPaymentInfo',
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

/** 此处后端没有提供注释 POST /api/integration/ods/getThCcmCorrespondenceVO */
export async function getCorrespondenceVo(
  body: API.CorrespondenceInitialBO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListCorrespondenceSendBO>(
    '/api/integration/ods/getThCcmCorrespondenceVO',
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

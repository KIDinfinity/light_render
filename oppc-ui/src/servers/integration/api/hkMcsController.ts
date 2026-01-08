// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/integration/mcs/getCustomerInfo */
export async function getCustomerInfo(
  body: API.PolicyAndInsuredParamVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListCustomerVO>(
    '/api/integration/mcs/getCustomerInfo',
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

/** 此处后端没有提供注释 POST /api/integration/mcs/getMcsClaims */
export async function getPolicyInsured(
  body: API.McsPAClaimParamVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOHkClaimInfoVO>(
    '/api/integration/mcs/getMcsClaims',
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

// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /rpc/rbac2/permission/submitAuthorityForBenefit */
export async function submitAuthorityForBenefit(
  body: API.BenefitAuthorityLimit[],
  options?: { [key: string]: any },
) {
  return request<API.ValidatedResultVO[]>(
    '/rpc/rbac2/permission/submitAuthorityForBenefit',
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

/** 此处后端没有提供注释 POST /rpc/rbac2/permission/verifySubmitLimitType */
export async function verifySubmitLimitType(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.ValidatedResultVO>(
    '/rpc/rbac2/permission/verifySubmitLimitType',
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

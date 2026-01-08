// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /rpc/integration/ph/pos/changeAddressContact */
export async function changeAddressContactInfo(
  body: API.ChangeAddressContactInfoDTO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListPhLifeAsiaResponseVO>(
    '/rpc/integration/ph/pos/changeAddressContact',
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

/** 此处后端没有提供注释 POST /rpc/integration/ph/pos/policyReprint */
export async function policyReprint(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.policyReprintParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOPhLifeAsiaResponseVO>(
    '/rpc/integration/ph/pos/policyReprint',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/integration/ph/pos/refund */
export async function refund(
  body: API.RefundTransactionBO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListPhLifeAsiaResponseVO>(
    '/rpc/integration/ph/pos/refund',
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

// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/pc/getProductInfoByContractTypeAndBusinessCode */
export async function getProductInfoByContractType(
  body: API.CftPlanProductQO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOCfgPlanProductVO>(
    '/api/pc/getProductInfoByContractTypeAndBusinessCode',
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

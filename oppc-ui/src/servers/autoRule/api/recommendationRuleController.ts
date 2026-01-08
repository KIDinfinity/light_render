// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/autoRule/getRecommendProductList */
export async function getRecommendProductList(
  body: Record,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListMapObjectObject>(
    '/api/autoRule/getRecommendProductList',
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

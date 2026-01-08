// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/pc/getDecommissionConfigList */
export async function getDecommissionConfigList(
  body: API.MinDecommissionDateRequestVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListCfgPlanDecommissionDO>(
    '/api/pc/getDecommissionConfigList',
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

/** 此处后端没有提供注释 POST /api/pc/getEarliestDecommissionConfig */
export async function getEarliestDecommissionConfig(
  body: API.MinDecommissionDateRequestVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOCfgPlanDecommissionDO>(
    '/api/pc/getEarliestDecommissionConfig',
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

/** 此处后端没有提供注释 POST /api/pc/getProductDetail */
export async function getProductDetail(
  body: API.ProductDetailRequestVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOProductDetailResponseVO>(
    '/api/pc/getProductDetail',
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

/** 此处后端没有提供注释 POST /api/pc/getProductList */
export async function getProductList(
  body: API.ProductListRequestVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOProductListResponseVO>('/api/pc/getProductList', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/pc/getProductName */
export async function getProductName(
  body: API.ProductNameRequestVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOProductNameResponseVO>('/api/pc/getProductName', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/pc/inquiryProductFeature */
export async function inquiryProductFeature(
  body: API.ProductFeatureRequestVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOProductFeatureResponseVO>(
    '/api/pc/inquiryProductFeature',
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

/** 此处后端没有提供注释 GET /api/pc/queryProductFundRelation */
export async function queryProductFundRelation1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.queryProductFundRelation1Params,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListCfgPlanFundBO>(
    '/api/pc/queryProductFundRelation',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

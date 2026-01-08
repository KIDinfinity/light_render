// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/pc/planPackage/getByProductAndRiderCode */
export async function getByProductAndRiderCode(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getByProductAndRiderCodeParams,
  options?: { [key: string]: any },
) {
  return request<API.CfgPlanPackageDO[]>(
    '/api/pc/planPackage/getByProductAndRiderCode',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/pc/planPackage/getContractTypeAndNoRepeat */
export async function getContractTypeAndNoRepeat(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getContractTypeAndNoRepeatParams,
  options?: { [key: string]: any },
) {
  return request<string[]>('/api/pc/planPackage/getContractTypeAndNoRepeat', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/pc/planPackage/getDefaultPlanPackagesByContractType */
export async function getDefaultPlanPackagesByContractType(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getDefaultPlanPackagesByContractTypeParams,
  options?: { [key: string]: any },
) {
  return request<API.CfgPlanPackageDO[]>(
    '/api/pc/planPackage/getDefaultPlanPackagesByContractType',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/pc/planPackage/getPlanPackages */
export async function getPlanPackages(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPlanPackagesParams,
  options?: { [key: string]: any },
) {
  return request<API.CfgPlanPackageDO[]>(
    '/api/pc/planPackage/getPlanPackages',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/pc/planPackage/getPlanPackagesByCaseTypeAndProductCodes */
export async function getPlanPackagesByCaseTypeAndProductCodes(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPlanPackagesByCaseTypeAndProductCodesParams,
  options?: { [key: string]: any },
) {
  return request<API.CfgPlanPackageDO[]>(
    '/api/pc/planPackage/getPlanPackagesByCaseTypeAndProductCodes',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/pc/planPackage/getPlanPackagesByContractType */
export async function getPlanPackagesByContractType(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPlanPackagesByContractTypeParams,
  options?: { [key: string]: any },
) {
  return request<API.CfgPlanPackageDO[]>(
    '/api/pc/planPackage/getPlanPackagesByContractType',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/pc/planPackage/getPlanPackagesByProductCodesAndRiderRequiredInd */
export async function getPlanPackagesByProductCodesAndRiderRequiredInd(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPlanPackagesByProductCodesAndRiderRequiredIndParams,
  options?: { [key: string]: any },
) {
  return request<API.CfgPlanPackageDO[]>(
    '/api/pc/planPackage/getPlanPackagesByProductCodesAndRiderRequiredInd',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/pc/planPackage/getPlanPackagesByRegion */
export async function getPlanPackagesByRegion(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPlanPackagesByRegionParams,
  options?: { [key: string]: any },
) {
  return request<API.CfgPlanPackageDO[]>(
    '/api/pc/planPackage/getPlanPackagesByRegion',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/pc/planPackage/getRtProductCode */
export async function getRtProductCode(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getRtProductCodeParams,
  options?: { [key: string]: any },
) {
  return request<string>('/api/pc/planPackage/getRtProductCode', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/pc/planPackage/getRtRiderCode */
export async function getRtRiderCode(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getRtRiderCodeParams,
  options?: { [key: string]: any },
) {
  return request<string>('/api/pc/planPackage/getRtRiderCode', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

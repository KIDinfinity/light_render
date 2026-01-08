// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/bpm/process/deployments/deleteDeployment */
export async function deleteDeployment(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteDeploymentParams,
  options?: { [key: string]: any },
) {
  return request<any>('/api/bpm/process/deployments/deleteDeployment', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/process/deployments/getDeployment */
export async function getDeployment(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getDeploymentParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVODeploymentResponse>(
    '/api/bpm/process/deployments/getDeployment',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/bpm/process/deployments/upload */
export async function uploadDeployment(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.uploadDeploymentParams,
  options?: { [key: string]: any },
) {
  return request<API.DeploymentResponse>(
    '/api/bpm/process/deployments/upload',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

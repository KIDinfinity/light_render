// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/bpm/process/job/deleteByJobId */
export async function deleteByJobId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteByJobIdParams,
  options?: { [key: string]: any },
) {
  return request<any>('/api/bpm/process/job/deleteByJobId', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/process/job/deleteOverdueJobInfo */
export async function deleteOverdueJobInfo(
  body: API.ProcessJobInfoDO,
  options?: { [key: string]: any },
) {
  return request<any>('/api/bpm/process/job/deleteOverdueJobInfo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/process/job/getByJobId */
export async function getByJobId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getByJobIdParams,
  options?: { [key: string]: any },
) {
  return request<API.ProcessJobInfoDO>('/api/bpm/process/job/getByJobId', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/bpm/process/job/getProcessJobInfo */
export async function getProcessJobInfo1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getProcessJobInfo1Params,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOProcessJobInfoDO>(
    '/api/bpm/process/job/getProcessJobInfo',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/bpm/process/job/insert */
export async function insert(
  body: API.ProcessJobInfoDO,
  options?: { [key: string]: any },
) {
  return request<any>('/api/bpm/process/job/insert', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/process/job/update */
export async function update(
  body: API.ProcessJobInfoDO,
  options?: { [key: string]: any },
) {
  return request<any>('/api/bpm/process/job/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/process/job/upsert */
export async function upsert(
  body: API.ProcessJobInfoDO,
  options?: { [key: string]: any },
) {
  return request<any>('/api/bpm/process/job/upsert', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/process/job/deleteByJobId */
export async function deleteByJobId1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteByJobId1Params,
  options?: { [key: string]: any },
) {
  return request<any>('/rpc/bpm/process/job/deleteByJobId', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/process/job/deleteOverdueJobInfo */
export async function deleteOverdueJobInfo1(
  body: API.ProcessJobInfoDO,
  options?: { [key: string]: any },
) {
  return request<any>('/rpc/bpm/process/job/deleteOverdueJobInfo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/process/job/getByJobId */
export async function getByJobId1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getByJobId1Params,
  options?: { [key: string]: any },
) {
  return request<API.ProcessJobInfoDO>('/rpc/bpm/process/job/getByJobId', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /rpc/bpm/process/job/getProcessJobInfo */
export async function getProcessJobInfo2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getProcessJobInfo2Params,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOProcessJobInfoDO>(
    '/rpc/bpm/process/job/getProcessJobInfo',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/bpm/process/job/insert */
export async function insert1(
  body: API.ProcessJobInfoDO,
  options?: { [key: string]: any },
) {
  return request<any>('/rpc/bpm/process/job/insert', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/process/job/update */
export async function update1(
  body: API.ProcessJobInfoDO,
  options?: { [key: string]: any },
) {
  return request<any>('/rpc/bpm/process/job/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/process/job/upsert */
export async function upsert1(
  body: API.ProcessJobInfoDO,
  options?: { [key: string]: any },
) {
  return request<any>('/rpc/bpm/process/job/upsert', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 GET /api/registration/srv/test/config/getAllVariablesControlConfig */
export async function getAllVariablesControlConfig(
  options?: {
    [key: string]: any;
  },
) {
  return request<API.ResultVOVariablesControlConfigDO>(
    '/api/registration/srv/test/config/getAllVariablesControlConfig',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/registration/srv/test/config/resetConfig */
export async function resetConfig(
  body: API.VariablesControlConfigDO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVariablesControlConfigDO>(
    '/api/registration/srv/test/config/resetConfig',
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

/** 此处后端没有提供注释 POST /api/registration/srv/test/config/updateConfig */
export async function updateConfig(
  body: API.VariablesControlConfigDO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVariablesControlConfigDO>(
    '/api/registration/srv/test/config/updateConfig',
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

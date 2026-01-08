// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/navigator/configuration/listAllConfigurablePageInfo */
export async function listAllConfigurable(options?: { [key: string]: any }) {
  return request<API.ResultVOListConfigurableNavigatorVO>(
    '/api/navigator/configuration/listAllConfigurablePageInfo',
    {
      method: 'POST',
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/navigator/configuration/listConfigurableByOrganization */
export async function listConfigurableByOrganization(
  body: API.ConfigurableNavigatorQueryDTO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListConfigurableNavigatorVO>(
    '/api/navigator/configuration/listConfigurableByOrganization',
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

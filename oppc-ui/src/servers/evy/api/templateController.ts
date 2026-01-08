// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/evy/template/getParamData */
export async function getTemplateParamData(
  body: API.TemplateParamDataRequest,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListMap>('/api/evy/template/getParamData', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

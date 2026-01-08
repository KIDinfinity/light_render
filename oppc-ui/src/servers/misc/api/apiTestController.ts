// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/navigator/test/holdCaseHelp */
export async function holdCaseHelp(
  body: API.CaseSubmitVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListExceptionMessage>(
    '/api/navigator/test/holdCaseHelp',
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

/** 此处后端没有提供注释 POST /api/navigator/test/testAPI */
export async function testApi(options?: { [key: string]: any }) {
  return request<API.ResultVOLong>('/api/navigator/test/testAPI', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/navigator/test/testRabbitMQ */
export async function testRabbitMq(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.testRabbitMQParams,
  body: string,
  options?: { [key: string]: any },
) {
  return request<any>('/api/navigator/test/testRabbitMQ', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      ...params,
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/navigator/test/triggerClaimAssessmentWorksheetJob */
export async function triggerClaimAssessmentWorksheetJob(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.triggerClaimAssessmentWorksheetJobParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOReturnTString>(
    '/api/navigator/test/triggerClaimAssessmentWorksheetJob',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

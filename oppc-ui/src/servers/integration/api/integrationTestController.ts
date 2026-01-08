// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/integration/v2/test/asyncCleanLogDataTask */
export async function asyncCleanLogDataTask(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.asyncCleanLogDataTaskParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>(
    '/api/integration/v2/test/asyncCleanLogDataTask',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/integration/v2/test/asyncMedicalProviderDataJob */
export async function asyncMedicalProviderDataJob(
  options?: {
    [key: string]: any;
  },
) {
  return request<API.ResultVO>(
    '/api/integration/v2/test/asyncMedicalProviderDataJob',
    {
      method: 'POST',
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/integration/v2/test/callService */
export async function callService(
  body: API.CallServiceVO,
  options?: { [key: string]: any },
) {
  return request<Record>('/api/integration/v2/test/callService', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/integration/v2/test/cancelAPOver30DaysReserve */
export async function cancelApOver30DaysReserve(
  body: API.LaResponseDetail[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>(
    '/api/integration/v2/test/cancelAPOver30DaysReserve',
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

/** 此处后端没有提供注释 POST /api/integration/v2/test/cancelExceptionCaseJob */
export async function cancelExceptionCaseJobHandler(
  options?: {
    [key: string]: any;
  },
) {
  return request<API.ResultVOString>(
    '/api/integration/v2/test/cancelExceptionCaseJob',
    {
      method: 'POST',
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/integration/v2/test/convertResponse */
export async function convertResponse(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.convertResponseParams,
  options?: { [key: string]: any },
) {
  return request<Record>('/api/integration/v2/test/convertResponse', {
    method: 'POST',
    params: {
      ...params,
      request: undefined,
      ...params['request'],
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/integration/v2/test/dbHealthCheck */
export async function dbHealthCheck(options?: { [key: string]: any }) {
  return request<API.ResultVOString>('/api/integration/v2/test/dbHealthCheck', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/integration/v2/test/localKafkaMockResponse */
export async function localKafkaMockResponse(
  body: Record[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVOString>(
    '/api/integration/v2/test/localKafkaMockResponse',
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

/** 此处后端没有提供注释 POST /api/integration/v2/test/localKafkaMockResponseV2 */
export async function localKafkaMockResponseV2(
  body: Record[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVOString>(
    '/api/integration/v2/test/localKafkaMockResponseV2',
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

/** 此处后端没有提供注释 POST /api/integration/v2/test/localKafkaProducerTest */
export async function localKafkaProducerTest(
  body: Record,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOString>(
    '/api/integration/v2/test/localKafkaProducerTest',
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

/** 此处后端没有提供注释 POST /api/integration/v2/test/mappingResponsetest */
export async function mappingResponseTest(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.mappingResponseTestParams,
  options?: { [key: string]: any },
) {
  return request<Record>('/api/integration/v2/test/mappingResponsetest', {
    method: 'POST',
    params: {
      ...params,
      mppingQO: undefined,
      ...params['mppingQO'],
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/integration/v2/test/retryJobDataSet */
export async function retryJobDataSet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.retryJobDataSetParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/integration/v2/test/retryJobDataSet', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/integration/v2/test/testFileNetSSL */
export async function testFileNetSsl(
  body: Record,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/integration/v2/test/testFileNetSSL', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/integration/v2/test/testFileNetSSL2 */
export async function testFileNetSsl2(
  body: Record,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/integration/v2/test/testFileNetSSL2', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/integration/v2/test/testHold */
export async function testHold(body: Record, options?: { [key: string]: any }) {
  return request<API.ResultVO>('/api/integration/v2/test/testHold', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/integration/v2/test/testMaxAccessCount */
export async function testMaxAccessCount(options?: { [key: string]: any }) {
  return request<number>('/api/integration/v2/test/testMaxAccessCount', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/integration/v2/test/testMaxLength */
export async function test2134(options?: { [key: string]: any }) {
  return request<string>('/api/integration/v2/test/testMaxLength', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/integration/v2/test/testReadTimeOut */
export async function testReadTimeOut(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.testReadTimeOutParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/integration/v2/test/testReadTimeOut', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/integration/v2/test/testRediss */
export async function testRedis(options?: { [key: string]: any }) {
  return request<string>('/api/integration/v2/test/testRediss', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/integration/v2/test/testRediss3 */
export async function testRediss3(options?: { [key: string]: any }) {
  return request<string>('/api/integration/v2/test/testRediss3', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/integration/v2/test/testRequest */
export async function testRequest(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.testRequestParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOObject>('/api/integration/v2/test/testRequest', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/integration/v2/test/testRestTemplate */
export async function testRestTemplate(
  body: API.IntegrationInterface,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOObject>(
    '/api/integration/v2/test/testRestTemplate',
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

/** 此处后端没有提供注释 POST /api/integration/v2/test/testRestTemplateForMaxStringLength */
export async function testRestTemplateForMaxStringLength(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.testRestTemplateForMaxStringLengthParams,
  body: API.IntegrationInterface,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOObject>(
    '/api/integration/v2/test/testRestTemplateForMaxStringLength',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        ...params,
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/integration/v2/test/testThrowException */
export async function testThrowException(
  body: API.ExceptionTestingRequest,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/integration/v2/test/testThrowException', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/integration/v2/test/triggerAsyncSubmissionRequestScheduleJob */
export async function triggerAsyncSubmissionRequestScheduleJob(
  options?: {
    [key: string]: any;
  },
) {
  return request<API.ResultVO>(
    '/api/integration/v2/test/triggerAsyncSubmissionRequestScheduleJob',
    {
      method: 'POST',
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/integration/v2/test/xurasTest/${param0} */
export async function xurasTest(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.xurasTestParams,
  body: Record,
  options?: { [key: string]: any },
) {
  const { screenCode: param0, ...queryParams } = params;
  return request<API.ResultVO>(`/api/integration/v2/test/xurasTest/${param0}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

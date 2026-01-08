// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/bpm/v2/task/complete */
export async function complete1(
  body: API.TaskCompletionVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOCaseTaskVO>('/api/bpm/v2/task/complete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/v2/task/completeAutoActivity */
export async function completeAutoActivity(
  body: API.TaskCompletionVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOCaseTaskVO>(
    '/api/bpm/v2/task/completeAutoActivity',
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

/** 此处后端没有提供注释 POST /api/bpm/v2/task/completeProcess */
export async function completeProcess1(
  body: API.CompleteProcessVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/bpm/v2/task/completeProcess', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/v2/task/createJpNonOpusPostProcessing */
export async function createJpNonOpusPostProcessing1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.createJpNonOpusPostProcessing1Params,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>(
    '/api/bpm/v2/task/createJpNonOpusPostProcessing',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/bpm/v2/task/createJpPostQc */
export async function createJpPostQc(
  body: API.CompleteTaskBOV2,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/bpm/v2/task/createJpPostQc', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/v2/task/createPostQc */
export async function createPostQc(
  body: API.TaskCompletionVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/bpm/v2/task/createPostQc', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/v2/task/endCaseForThai */
export async function endCaseForThai(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.endCaseForThaiParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOBoolean>('/api/bpm/v2/task/endCaseForThai', {
    method: 'POST',
    params: {
      // modifier has a default value: SystemAdmin
      modifier: 'SystemAdmin',
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/v2/task/escalateAssignee */
export async function escalateAssignee(
  body: API.CaseSubmitVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOString>('/api/bpm/v2/task/escalateAssignee', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/v2/task/getCompleteTaskByCaseNo */
export async function getCompleteTaskByCaseNo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCompleteTaskByCaseNoParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOCompleteTaskBOV2>(
    '/api/bpm/v2/task/getCompleteTaskByCaseNo',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/bpm/v2/task/getLatestManualUwTaskEndDate */
export async function getLatestManualUwTaskEndDate(
  body: API.CaseSubmitVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVODate>(
    '/api/bpm/v2/task/getLatestManualUwTaskEndDate',
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

/** 此处后端没有提供注释 POST /api/bpm/v2/task/manualEscalateAssignee */
export async function manualEscalateAssignee(
  body: API.AssignTeamVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOString>(
    '/api/bpm/v2/task/manualEscalateAssignee',
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

/** 此处后端没有提供注释 POST /api/bpm/v2/task/resumeTask */
export async function resumeTask1(
  body: API.BaseInfoParam,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>('/api/bpm/v2/task/resumeTask', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/v2/task/validate */
export async function validate(
  body: API.CaseSubmitVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListExceptionMessage>(
    '/api/bpm/v2/task/validate',
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

/** 此处后端没有提供注释 POST /api/bpm/v2/task/validateAutoSubmission */
export async function validateAutoSubmission(
  body: API.CaseSubmitVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListExceptionMessage>(
    '/api/bpm/v2/task/validateAutoSubmission',
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

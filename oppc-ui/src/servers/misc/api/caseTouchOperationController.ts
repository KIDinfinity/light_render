// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/navigator/cases/getTouchResult */
export async function getTouchResult(
  body: API.TaskQueryVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/navigator/cases/getTouchResult', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/navigator/cases/revertTouchResult */
export async function cleanTouchResult(
  body: API.TaskQueryVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/navigator/cases/revertTouchResult', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/navigator/cases/touch */
export async function touch(
  body: API.CaseSubmitVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/navigator/cases/touch', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/navigator/cases/triggerUnknowProcess */
export async function triggerUnknowProcess(
  body: API.CaseCreationVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/navigator/cases/triggerUnknowProcess', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/autoRule/getAssigneeByGroup */
export async function getAssigneeByGroup(
  body: API.AssignGroupVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOString>('/api/autoRule/getAssigneeByGroup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/autoRule/getAutoDecision */
export async function getAutoDecision1(
  body: string,
  options?: { [key: string]: any },
) {
  return request<Record>('/api/autoRule/getAutoDecision', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/autoRule/getAutoSubmission */
export async function getAutoSubmission(
  body: string,
  options?: { [key: string]: any },
) {
  return request<string>('/api/autoRule/getAutoSubmission', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

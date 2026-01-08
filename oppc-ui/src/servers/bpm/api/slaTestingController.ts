// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/bpm/sla/assignActivity */
export async function assignActivity(
  body: string,
  options?: { [key: string]: any },
) {
  return request<any>('/api/bpm/sla/assignActivity', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/sla/completeTask */
export async function completeTask4(
  body: string,
  options?: { [key: string]: any },
) {
  return request<any>('/api/bpm/sla/completeTask', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/sla/createCaseEvent */
export async function createCaseEvent(
  body: string,
  options?: { [key: string]: any },
) {
  return request<any>('/api/bpm/sla/createCaseEvent', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/sla/levelChangeEvent */
export async function levelChangeEvent(
  body: string,
  options?: { [key: string]: any },
) {
  return request<any>('/api/bpm/sla/levelChangeEvent', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/sla/rejectTask */
export async function rejectTask(
  body: string,
  options?: { [key: string]: any },
) {
  return request<any>('/api/bpm/sla/rejectTask', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/sla/sendSLAEvent */
export async function sendSlaEvent(
  body: string,
  options?: { [key: string]: any },
) {
  return request<any>('/api/bpm/sla/sendSLAEvent', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

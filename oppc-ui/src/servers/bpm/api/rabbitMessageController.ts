// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/bpm/rabbit/send/completeTask */
export async function completeTask5(
  body: API.MessageJob,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/bpm/rabbit/send/completeTask', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/rabbit/send/sendCaseMgntMq */
export async function sendCaseMgntMq(
  body: API.InitialProcessQueueParam,
  options?: { [key: string]: any },
) {
  return request<any>('/api/bpm/rabbit/send/sendCaseMgntMq', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/rabbit/send/sendRelevantCaseMq */
export async function sendRelevantCaseMq(
  body: API.QueueRelevantCaseActionVO,
  options?: { [key: string]: any },
) {
  return request<any>('/api/bpm/rabbit/send/sendRelevantCaseMq', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/rabbit/send/startProcess */
export async function startProcess(
  body: API.MessageJob,
  options?: { [key: string]: any },
) {
  return request<any>('/api/bpm/rabbit/send/startProcess', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /rpc/bpm/user/findSharingTaskByUser */
export async function findSharingTaskByBusinessNo(
  body: API.UserAutoRuleFactInfoInquiryVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListRuleCommonRpcFactInfoVO>(
    '/rpc/bpm/user/findSharingTaskByUser',
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

/** 此处后端没有提供注释 POST /rpc/bpm/user/findSummaryTaskVolumeByUser */
export async function findSummaryTaskVolumeByUser(
  body: API.UserAutoRuleFactInfoInquiryVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListRuleCommonRpcFactInfoVO>(
    '/rpc/bpm/user/findSummaryTaskVolumeByUser',
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

/** 此处后端没有提供注释 POST /rpc/bpm/user/findUAACaseHisTask */
export async function findUaaCaseHisTask(
  body: API.UserAutoRuleFactInfoInquiryVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListRuleCommonRpcFactInfoVO>(
    '/rpc/bpm/user/findUAACaseHisTask',
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

/** 此处后端没有提供注释 POST /rpc/bpm/user/findUAATask */
export async function findUaaTask(
  body: API.UserAutoRuleFactInfoInquiryVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListRuleCommonRpcFactInfoVO>(
    '/rpc/bpm/user/findUAATask',
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

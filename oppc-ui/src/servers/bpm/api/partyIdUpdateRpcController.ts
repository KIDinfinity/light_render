// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /rpc/bpm/partyId/update */
export async function updatePartyId(
  body: API.InsuredDO[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/rpc/bpm/partyId/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

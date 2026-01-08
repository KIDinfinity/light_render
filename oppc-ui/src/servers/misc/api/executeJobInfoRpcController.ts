// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /rpc/navigator/executeJobInfo/findNaviExecuteJobInfoByJobName */
export async function findNaviExecuteJobInfoByJobName(
  body: string,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListNaviExecuteJobInfoVO>(
    '/rpc/navigator/executeJobInfo/findNaviExecuteJobInfoByJobName',
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

/** 此处后端没有提供注释 POST /rpc/navigator/executeJobInfo/saveBatch */
export async function saveBatch1(
  body: API.NaviExecuteJobInfoVO[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/rpc/navigator/executeJobInfo/saveBatch', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

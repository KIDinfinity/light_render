
import request from '@/utils/request';

export async function getCueMessage(params?: any, option?: any): Promise<any> {
  return request('/rpc/misc/message/getCueMessage', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getCueMessageAndCode(params?: any, option?: any): Promise<any> {
  return request('/rpc/misc/message/getCueMessageAndCode', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getMessageCode(params?: any, option?: any): Promise<any> {
  return request('/rpc/misc/message/getMessageCode', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getParamsMessage(params?: any, option?: any): Promise<any> {
  return request('/rpc/misc/message/getParamsMessage', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getCueMessage,
  getCueMessageAndCode,
  getMessageCode,
  getParamsMessage,
}

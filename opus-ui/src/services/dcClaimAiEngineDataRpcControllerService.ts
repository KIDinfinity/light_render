
import request from '@/utils/request';

export async function handlerAIEngineDataToAIAssessment(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/claim/handlerAIEngineDataToAIAssessment', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function handlerAIEngineDataToAIStat(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/claim/handlerAIEngineDataToAIStat', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function handlerAIEngineDataToExclusion(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/claim/handlerAIEngineDataToExclusion', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  handlerAIEngineDataToAIAssessment,
  handlerAIEngineDataToAIStat,
  handlerAIEngineDataToExclusion,
}

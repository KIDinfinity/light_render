import { stringify } from 'qs';
import request from '@/utils/request';

export async function findQuestionnaireKey(params?: any, option?: any): Promise<any> {
  return request(`/api/questionnaire/case/answer/findQuestionnaireKey?${stringify(params)}`, {
    localCache: true,
    ...option,
  });
}

export async function query(params?: any, option?: any): Promise<any> {
  return request('/api/questionnaire/case/answer/query', {
    localCache: true,
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function queryQuestionnaireByClientId(params?: any, option?: any): Promise<any> {
  return request('/api/questionnaire/case/answer/queryQuestionnaireByClientId', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  findQuestionnaireKey,
  query,
  queryQuestionnaireByClientId,
};

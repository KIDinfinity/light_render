
import request from '@/utils/request';

export async function advancedQuery(params?: any, option?: any): Promise<any> {
  return request('/api/mc/query/advancedQuery', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function contactsQuery(params?: any, option?: any): Promise<any> {
  return request('/api/mc/query/contactsQuery', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  advancedQuery,
  contactsQuery,
}

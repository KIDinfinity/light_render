import request from '@/utils/request';

export async function contactsQuery(params?: any, option?: any): Promise<any> {
  return request('/api/uc/contacts/contactsQuery', {
    localCache: true,
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  contactsQuery,
};

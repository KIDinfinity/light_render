
import { stringify } from 'qs';
import request from '@/utils/request';

export async function rmQ(params?: any, option?: any): Promise<any> {
  return request(`/api/srv/rabbitMq/rmQ?${stringify(params)}`, {
    ...option,
  });
}

export default {
  rmQ,
}


import { stringify } from 'qs';
import request from '@/utils/request';

export async function getTriggerPoint(params?: any, option?: any): Promise<any> {
  return request(`/api/bpm/jp/auditLog/getTriggerPoint?${stringify(params)}`, {
    ...option,
  });
}

export default {
  getTriggerPoint,
}

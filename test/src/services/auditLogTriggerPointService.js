import { stringify } from 'qs';
import request from '@/utils/request';

export async function getTriggerPoint(params) {
  return request(`/api/bpm/jp/auditLog/getTriggerPoint?${stringify(params)}`);
}

export default {
  getTriggerPoint,
};

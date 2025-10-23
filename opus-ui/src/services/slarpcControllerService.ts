
import { stringify } from 'qs';
import request from '@/utils/request';

export async function getCalendar(params?: any, option?: any): Promise<any> {
  return request(`/rpc/sla/getCalendar?${stringify(params)}`, {
    ...option,
  });
}

export async function getHolidays(params?: any, option?: any): Promise<any> {
  return request(`/rpc/sla/getHolidays?${stringify(params)}`, {
    ...option,
  });
}

export default {
  getCalendar,
  getHolidays,
}

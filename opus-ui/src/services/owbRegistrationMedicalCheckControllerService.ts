import request from '@/utils/request';

export async function reject(params?: any, option?: any): Promise<any> {
  return request('/api/registration/medicalCheck/appointmentDate/reject', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function confirm(params?: any, option?: any): Promise<any> {
  return request('/api/registration/medicalCheck/hospitalCategory/confirm', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  reject,
  confirm,
};

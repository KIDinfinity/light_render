import request from '@/utils/request';
export async function findAllHealthCheck() {
  return request('/api/integration/healthCheck/findAllHealthCheck', {
    method: 'POST',
  });
}
export async function one(params: any) {
  return request('/api/integration/healthCheck/one', {
    method: 'POST',
    body: params,
  });
}
export async function findHealthCheckOne(params: any) {
  return request('/api/integration/healthCheck/findHealthCheckOne', {
    method: 'POST',
    body: params,
  });
}
export async function all() {
  return request('/api/integration/healthCheck/all', {
    method: 'POST',
  });
}
export default {
  findAllHealthCheck,
  one,
  all,
  findHealthCheckOne,
};

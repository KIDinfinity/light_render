
import request from '@/utils/request';

export async function apiQueryAccuracyConfig(params?: any, option?: any): Promise<any> {
  return request('/api/misc/accuracyconfig/apiQueryAccuracyConfig', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function rpcQueryAccuracyConfig(params?: any, option?: any): Promise<any> {
  return request('/rpc/misc/accuracyconfig/rpcQueryAccuracyConfig', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function testAccuracy01(params?: any, option?: any): Promise<any> {
  return request('/rpc/misc/accuracyconfig/testAccuracy01', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function testAccuracy02(params?: any, option?: any): Promise<any> {
  return request('/rpc/misc/accuracyconfig/testAccuracy02', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  apiQueryAccuracyConfig,
  rpcQueryAccuracyConfig,
  testAccuracy01,
  testAccuracy02,
}

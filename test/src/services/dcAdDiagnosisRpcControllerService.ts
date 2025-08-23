
import request from '@/utils/request';

export async function getADDiagnosises(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/claim/getADDiagnosises', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getADDiagnosises,
}

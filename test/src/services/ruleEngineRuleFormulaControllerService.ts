
import request from '@/utils/request';

export async function addAtomToLibrary(params?: any, option?: any): Promise<any> {
  return request('/api/ruleEngine/addAtomToLibrary', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getAtomFormulaInfo(params?: any, option?: any): Promise<any> {
  return request('/api/ruleEngine/getAtomFormulaInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  addAtomToLibrary,
  getAtomFormulaInfo,
}

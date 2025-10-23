
import request from '@/utils/request';

export async function generatePhCorrespondence(params?: any, option?: any): Promise<any> {
  return request('/api/transverter/generatePhCorrespondence', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function generatePhCorrespondenceByClaimAssessment(params?: any, option?: any): Promise<any> {
  return request('/api/transverter/generatePhCorrespondenceByClaimAssessment', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function transform(params?: any, option?: any): Promise<any> {
  return request('/api/transverter/transform', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function transformByRegion(params?: any, option?: any): Promise<any> {
  return request('/api/transverter/transformByRegion', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  generatePhCorrespondence,
  generatePhCorrespondenceByClaimAssessment,
  transform,
  transformByRegion,
}

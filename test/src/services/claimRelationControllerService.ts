import { stringify } from 'qs';
import request from '@/utils/request';

export async function getJpRelatedTreatmentDetail(params?: any, option?: any): Promise<any> {
  return request('/api/claim/relation/getJpRelatedTreatmentDetail', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getJpRelatedTreatmentInfo(params?: any, option?: any): Promise<any> {
  return request('/api/claim/relation/getJpRelatedTreatmentInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getJpRelatedTreatmentList(params?: any, option?: any): Promise<any> {
  return request(`/api/claim/relation/getJpRelatedTreatmentList?${stringify(params)}`, {
    ...option,
  });
}

export async function getRelatedTreatmentInfo(params?: any, option?: any): Promise<any> {
  return request('/api/claim/relation/getRelatedTreatmentInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function patchJpRelationship(params?: any, option?: any): Promise<any> {
  return request('/api/claim/relation/patchJpRelationship', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function patchRelationship(params?: any, option?: any): Promise<any> {
  return request('/api/claim/relation/patchRelationship', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function refresh(params?: any, option?: any): Promise<any> {
  return request('/api/claim/relation/refresh', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getJpRelatedTreatmentDetail,
  getJpRelatedTreatmentInfo,
  getJpRelatedTreatmentList,
  getRelatedTreatmentInfo,
  patchJpRelationship,
  patchRelationship,
  refresh,
};

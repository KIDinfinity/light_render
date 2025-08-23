import request from '@/utils/request';
import { stringify } from 'qs';

export async function getEws(params?: any, option?: any): Promise<any> {
  return request('/api/dc/proposal/getEws', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getNewestEwsByOperationType(params?: any, option?: any): Promise<any> {
  return request('/api/dc/proposal/findNewestEwsByOperationType', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getPolicyDecisionCode(params?: any, option?: any): Promise<any> {
  return request('/api/dc/proposal/getPolicyDecisionCode', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getEwsById(params?: any, option?: any): Promise<any> {
  return request(`/api/dc/proposal/getEwsById?${stringify(params)}`, {
    ...option,
    method: 'GET',
  });
}

export async function getEwsTimeList(params?: any, option?: any): Promise<any> {
  return request('/api/dc/proposal/getEwsTimeList', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getEws,
  getNewestEwsByOperationType,
  getEwsById,
  getEwsTimeList,
  getPolicyDecisionCode,
};

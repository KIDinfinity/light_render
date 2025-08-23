
import request from '@/utils/request';

export async function deleteInfomationById(params?: any, option?: any): Promise<any> {
  return request('/api/navigator/information/deleteInfomationById', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findInformation(params?: any, option?: any): Promise<any> {
  return request('/api/navigator/information/findInformation', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findInformationHist(params?: any, option?: any): Promise<any> {
  return request('/api/navigator/information/findInformationHist', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findTempInformationNum(params?: any, option?: any): Promise<any> {
  return request('/api/navigator/information/findTempInformationNum', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getTemporaryInformation(params?: any, option?: any): Promise<any> {
  return request('/api/navigator/information/getTemporaryInformation', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function saveInformation(params?: any, option?: any): Promise<any> {
  return request('/api/navigator/information/saveInformation', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  deleteInfomationById,
  findInformation,
  findInformationHist,
  findTempInformationNum,
  getTemporaryInformation,
  saveInformation,
}

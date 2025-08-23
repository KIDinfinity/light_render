import request from '@/utils/request';
import { stringify } from 'qs';

export async function getSectionInfo(params) {
  return request(`/api/case/mgnt/summaryPage/getSectionInfo?${stringify(params)}`, {});
}

export async function getAllSectionData(params) {
  return request(`/api/case/mgnt/summaryPage/getAllSectionData?${stringify(params)}`, {});
}

export async function getSectionData(params) {
  return request(`/api/navigator/summaryPage/getSectionData`, {
    method: 'POST',
    body: params,
  });
}

export default { getSectionInfo, getAllSectionData, getSectionData };

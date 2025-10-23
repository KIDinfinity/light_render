
import { stringify } from 'qs';
import request from '@/utils/request';

export async function dataPatchForCaseFinalStatus(params?: any, option?: any): Promise<any> {
  return request(`/api/claim/dataPatchForCaseFinalStatus?${stringify(params)}`, {
    ...option,
  });
}

export async function supplyInquiryBusinessToBPM(params?: any, option?: any): Promise<any> {
  return request(`/api/claim/supplyInquiryBusinessToBPM?${stringify(params)}`, {
    ...option,
  });
}

export default {
  dataPatchForCaseFinalStatus,
  supplyInquiryBusinessToBPM,
}

import request from '@/utils/request';
import { stringify } from 'qs';

export async function downloadUWAssessmentWorksheet(params?: any, option?: any): Promise<any> {
  return request(`/api/nb/downloadUWAssessmentWorksheet?${stringify(params)}`, {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function uploadUWAssessmentWorksheet(params?: any, option?: any): Promise<any> {
  return request(`/api/nb/uploadUWAssessmentWorksheet?${stringify(params)}`, {
    ...option,
    method: 'POST',
    body: params,
  });
}


export async function downloadAssessmentWorksheet(params?: any, option?: any): Promise<any> {
  return request(`/api/navigator/worksheet/downloadWorksheet?${stringify(params)}`, {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function uploadAssessmentWorksheet(params?: any, option?: any): Promise<any> {
  return request(`/api/navigator/worksheet/uploadWorksheet?${stringify(params)}`, {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  downloadUWAssessmentWorksheet,
  uploadUWAssessmentWorksheet,
};

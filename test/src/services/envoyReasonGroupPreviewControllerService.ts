import request from '@/utils/request';

export async function getCorrespondencePreviewData(params?: any, option?: any): Promise<any> {
  return request('/api/evy/ReasonGroupPreview/getCorrespondencePreviewData', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function saveReasonGroupPreviewData(params?: any, option?: any): Promise<any> {
  return request('/api/evy/ReasonGroupPreview/saveReasonGroupPreviewData', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getCorrespondencePreviewData,
};

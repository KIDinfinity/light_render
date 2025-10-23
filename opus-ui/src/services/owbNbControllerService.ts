import request from '@/utils/request';
import { stringify } from 'qs';

export async function isShowUploadButton(params?: any, option?: any): Promise<any> {
  return request(`/api/nb/isShowUploadButton?${stringify(params)}`, {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function isShowUploadButtonClaim(params?: any, option?: any): Promise<any> {
  return request(`/api/navigator/worksheet/isShowUploadButton?${stringify(params)}`, {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  isShowUploadButton,
  isShowUploadButtonClaim,
};

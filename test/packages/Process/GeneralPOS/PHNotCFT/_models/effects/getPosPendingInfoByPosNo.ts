import lodash from 'lodash';
import { getPosPendingInfoByPosNo } from '@/services/posControllerService';

export default function* (action: any, { call }: any) {
  const { posNo } = action.payload;
  const response = yield call(getPosPendingInfoByPosNo, { posNo });

  if (lodash.isPlainObject(response) && response.success) {
    return response?.resultData;
  }
  return {};
}

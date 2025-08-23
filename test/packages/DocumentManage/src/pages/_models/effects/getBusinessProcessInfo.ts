import lodash from 'lodash';
import { getBusinessProcessInfo } from '@/services/docViewControllerService';

/**
 * 从task detail中获取case information
 */
export default function* getBusinessProcessInfoEffect({ payload }: any, { call, put }: any) {
  const response = yield call(getBusinessProcessInfo, payload);

  const { success, resultData } = lodash.pick(response, ['success', 'resultData']);
  if (success && resultData) {
    return resultData
  }
  return []
}

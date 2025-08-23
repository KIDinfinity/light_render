import lodash from 'lodash';
import { all } from '@/services/docViewControllerService';

/**
 * 从task detail中获取case information
 */
export default function* getFieldConfigure(_: any, { call, put }: any) {
  const response = yield call(all);

  const { success, resultData } = lodash.pick(response, ['success', 'resultData']);
  if (success && resultData) {
    yield put({
      type: 'saveFieldConfigure',
      payload: {
        fieldConfigure: lodash.groupBy(resultData, 'groupCode'),
      },
    });
  }
}

import lodash from 'lodash';
import { listDedupCheckCfg } from '@/services/owbNbDropdownControllerService';

export default function* (_, { call, put }: any) {
  const response = yield call(listDedupCheckCfg);
  if (lodash.isPlainObject(response) && response.success && response.resultData) {
    const listDedupCheckCfg = response.resultData;
    yield put({
      type: 'saveListDedupCheckCfg',
      payload: {
        listDedupCheckCfg,
      },
    });
  }
}

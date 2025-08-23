import lodash from 'lodash';
import { listDedupCheckCfg } from '@/services/owbNbDropdownControllerService';

import { NAMESPACE } from '../../../activity.config';

export default function* (_, { call, put, select }: any) {
  const preList = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.listDedupCheckCfg
  );
  if (lodash.size(preList) > 0) {
    return;
  }

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

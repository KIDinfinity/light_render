import lodash from 'lodash';
import { groupTasksByReason } from '@/services/dcHomePageCaseDataCallService';

export default function* getStatusFilterList({ payload }: any, { put, call }: any) {
  const url = groupTasksByReason;

  if (url) {
    const response = yield call(url, payload);

    if (
      lodash.isPlainObject(response) &&
      response?.success &&
      lodash.isArray(response.resultData)
    ) {
      yield put({
        type: 'saveFilterReasonList',
        payload: {
          list: response.resultData,
        },
      });
    }
  }
}

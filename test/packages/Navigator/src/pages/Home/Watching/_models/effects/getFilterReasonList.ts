import lodash from 'lodash';
import { groupTasksByReason } from '@/services/dcHomePageCaseDataCallService';

export default function* getStatusFilterList(
  { payload, signal = null }: any,
  { put, call, select }: any
) {
  const url = groupTasksByReason;

  if (url) {
    const response = yield call(url, payload, { signal });

    if (
      lodash.isPlainObject(response) &&
      response?.success &&
      lodash.isArray(response.resultData)
    ) {
      const filterParams = yield select((state: any) => state.navigatorHomeWatching.filterParams);
      const { taskGroupCode = '' } = filterParams || {};
      if (taskGroupCode) {
        const isCurrentTaskGroupCodeInLatestList = lodash.some(response.resultData, (item) => {
          return item?.taskGroupCode === taskGroupCode;
        });
        if (!isCurrentTaskGroupCodeInLatestList) {
          yield put({
            type: 'saveFilterParams',
            payload: {
              changeValue: { taskGroupCode: '' },
            },
          });
        }
      }
      yield put({
        type: 'saveFilterReasonList',
        payload: {
          list: response.resultData,
        },
      });
    }
  }
}

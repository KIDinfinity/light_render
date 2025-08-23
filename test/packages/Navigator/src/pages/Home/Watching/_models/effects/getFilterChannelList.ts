import lodash from 'lodash';
import { groupTasksByChannel } from '@/services/dcHomePageCaseDataCallService';
import { LS, LSKey } from '@/utils/cache';

export default function* getFilterChannelList({ payload }: any, { put, call }: any) {
  const url = groupTasksByChannel;
  if (url) {
    const response = yield call(url, payload);
    if (
      lodash.isPlainObject(response) &&
      response?.success &&
      lodash.isArray(response.resultData)
    ) {
      const filterParams = LS.getItem(LSKey.NAVIGATOR_CASE_FILTER);
      const { submissionChannel = '' } = filterParams || {};
      const isStorageSubmissionChannelInLatestList = lodash.some(response.resultData, (item) => {
        return item?.taskGroupCode === submissionChannel;
      });

      if (submissionChannel && !isStorageSubmissionChannelInLatestList) {
        LS.setItem(LSKey.NAVIGATOR_CASE_FILTER, {
          ...filterParams,
          submissionChannel: '',
        });
        yield put({
          type: 'saveFilterParams',
          payload: {
            changeValue: { submissionChannel: '' },
          },
        });
      }
      yield put({
        type: 'saveFilterChannelList',
        payload: {
          list: response.resultData,
        },
      });
    }
  }
}

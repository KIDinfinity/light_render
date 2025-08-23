import lodash from 'lodash';
import { getEarliestCoverageDate } from '@/services/claimThControllerService';

function* getPolicyDataByReason({ payload }: any, { call, put, select }: any) {
  const { groupId, dataId, name } = payload;

  const { businessNo, taskId } = yield select((state: any) =>
    lodash.pick(state.envoyController, ['businessNo', 'taskId'])
  );

  const response = yield call(getEarliestCoverageDate, {
    claimNo: businessNo,
    taskId,
  });

  if (lodash.isPlainObject(response) && response.success) {
    yield put({
      type: 'saveReasonPolicy',
      payload: {
        groupId,
        dataId,
        name,
        value: response?.resultData?.earliestCoverageDate || '',
      },
    });
  }
}

export default getPolicyDataByReason;

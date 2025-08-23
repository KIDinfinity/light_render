import lodash from 'lodash';
import { findPosDataCaptureByCaseNo } from '@/services/posControllerService';

export default function* ({ payload }: any, { select, call, put }: any) {
  const { businessNo, taskDefKey, submissionChannel } = yield select(
    (state: any) => state.processTask.getTask
  );
  if (!payload?.businessNo && !businessNo) {
    return;
  }
  const response = yield call(findPosDataCaptureByCaseNo, {
    businessNo: payload?.businessNo || businessNo,
  });
  if (lodash.isPlainObject(response) && response.success && !lodash.isEmpty(response.resultData)) {
    const posDataDetail = response?.resultData?.posDataDetail || {};
    yield put({
      type: 'saveClaimProcessData',
      payload: {
        claimProcessData: {
          ...response.resultData,
          submissionChannel: response.resultData?.submissionChannel || submissionChannel,
          posDataDetail,
          originalSectionData: response?.resultData?.originalSectionData || {},
        },
        taskDefKey: taskDefKey || response?.resultData,
      },
    });

    // In Force节点获取PayInStatus
    yield put({
      type: 'getQueryPayInStatus',
      payload: {
        posDataDetail,
        taskDefKey,
      },
    });
    yield put.resolve({
      type: 'getUsTaxInformationByPosNo',
      payload: { posNo: posDataDetail?.posNo },
    });
  }
}

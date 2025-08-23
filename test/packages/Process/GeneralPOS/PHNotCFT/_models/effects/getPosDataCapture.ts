import lodash from 'lodash';
import { findPosDataCaptureByCaseNo } from '@/services/posControllerService';

export default function* ({ payload }: any, { select, call, put }: any) {
  const { businessNo, taskDefKey } = yield select(
    (state: any) => state.processTask.getTask
  );
  const claimProcessData = yield select((state: any) =>
    state.GeneralPOSPHNotCFTController.claimProcessData,
  );
  if (!payload?.businessNo && !businessNo) {
    return;
  }
  const response = yield call(findPosDataCaptureByCaseNo, {
    businessNo: payload?.businessNo || businessNo,
  });
  if (lodash.isPlainObject(response) && response.success && !lodash.isEmpty(response.resultData)) {
    const businessData = response?.resultData?.posDataDetail || {};
    yield put({
      type: 'saveClaimProcessData',
      payload: {
        claimProcessData: {
          ...claimProcessData,
          ...response.resultData,
          businessData: {
            ...claimProcessData.businessData,
            ...businessData
          },
          originalSectionData: response?.resultData?.originalSectionData || {},
        },
        taskDefKey: taskDefKey || response?.resultData,
      },
    });

    yield put.resolve({
      type: 'getUsTaxInformationByPosNo',
      payload: { posNo: businessData?.posNo },
    });
  }
}

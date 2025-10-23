import bpm from 'bpm/pages/OWBEntrance';
import { refreshRefundInfo } from '@/services/claimJpLifejBoControllerService';
import { handleMessageModal } from '@/utils/commonMessage';

import { NAMESPACE } from '../../activity.config';

export default function* getLifeJRefundInfo(
  { payload }: any,
  { call, put, select }: any
): Generator<any, void, any> {
  const claimNo = yield select(
    ({ [NAMESPACE]: modelspace }: any) => modelspace?.claimProcessData?.claimNo
  );
  const taskId = yield select(({ processTask }: any) => processTask?.getTask?.taskId);
  const { incidentId } = payload;

  const response = yield call(refreshRefundInfo, { claimNo, taskId });

  if (response && response.success) {
    yield put({
      type: 'saveLifeJClaim',
      payload: {
        klipCaseInfoList: response?.resultData,
        incidentId,
      },
    });
    bpm.buttonAction('save');
  } else {
    handleMessageModal(response?.promptMessages);
  }
}

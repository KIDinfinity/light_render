import lodash from 'lodash';
import { find } from '@/services/bpmUnknownDocFlowControllerService';
import { safeParseUtil } from '@/utils/utils';
import { queryData } from '@/services/dcSnapshotService';

export default function* ({ payload }: any, { call, put }: any) {
  const { taskId, caseNo } = payload;

  const snapShotResponse = yield call(queryData, {
    dataType: 'mainPage',
    taskId,
  });
  if (lodash.get(snapShotResponse, 'resultData.dataValue')) {
    const datas = safeParseUtil(snapShotResponse.resultData.dataValue);
    if (!lodash.isEmpty(datas)) {
      yield put({
        type: 'saveClaimProcessData',
        payload: {
          ...datas,
        },
      });
    }
  } else {
    const response = yield call(find, {
      caseNo,
    });

    if (response && response.success) {
      yield put({
        type: 'saveClaimProcessData',
        payload: {
          claimProcessData: response?.resultData || {},
        },
      });
      yield put({
        type: 'search',
      });
    }
  }
}

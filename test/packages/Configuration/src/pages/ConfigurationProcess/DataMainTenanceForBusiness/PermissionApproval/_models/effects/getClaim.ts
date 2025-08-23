import { queryData } from '@/services/dcSnapshotService';
import lodash from 'lodash';
import { safeParseUtil } from '@/utils/utils';

export default function* ({ payload }: any, { call, put, select }: any) {
  const { taskId, businessNo, caseNo } = yield select((state) => state.processTask?.getTask);
  const snapShot = yield call(queryData, {
    dataType: 'mainPage',
    taskId,
  });
  const snapShotData = safeParseUtil(lodash.get(snapShot, 'resultData.dataValue', '{}'));
  const isEmptySnapShot =
    lodash.isEmpty(snapShotData) || lodash.isEmpty(snapShotData?.functionData);

  if (isEmptySnapShot) {
    yield put.resolve({
      type: 'getFunction',
    });

    yield put({
      type: 'getVersionList',
      payload: {
        caseNo,
      },
    });
  } else {
    yield put({
      type: 'saveFunctionData',
      payload: {
        ...snapShotData,
      },
    });
  }
}

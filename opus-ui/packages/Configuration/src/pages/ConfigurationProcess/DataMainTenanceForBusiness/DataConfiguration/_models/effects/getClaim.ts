import { queryData } from '@/services/dcSnapshotService';
import lodash from 'lodash';
import { safeParseUtil } from '@/utils/utils';
import moment from 'moment';

export default function* ({ payload }: any, { call, put }: any) {
  const { previewRecord, taskId } = payload;
  const snapShot = yield call(queryData, {
    dataType: 'mainPage',
    taskId,
  });
  const snapShotData = safeParseUtil(lodash.get(snapShot, 'resultData.dataValue', '{}'), {});
  const isEmptySnapShot =
    lodash.isEmpty(snapShotData) ||
    lodash.isEmpty(snapShotData?.functionData) ||
    lodash.isEmpty(snapShotData?.functionData?.dataFieldList);

  if (isEmptySnapShot) {
    yield put.resolve({
      type: 'getFunction',
    });
  } else {
    yield put({
      type: 'saveFunctionData',
      payload: {
        ...snapShotData,
        headerData: {
          ...snapShotData?.headerData,
          effectiveDate: moment().format(),
          expiryDate: moment('2999-12-31').format(),
        },
      },
    });
  }
  if (!lodash.isEmpty(previewRecord)) {
    const { cc_key, ...res } = previewRecord;
    yield put({
      type: 'saveFormData',
      payload: {
        formData: res,
      },
    });
  }
}

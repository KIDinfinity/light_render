import { queryData } from '@/services/dcSnapshotService';
import lodash from 'lodash';
import { safeParseUtil } from '@/utils/utils';
import moment from 'moment';

export default function* ({ payload }: any, { call, put, select }: any) {
  const { taskId } = payload;

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
  const { previewRecord, isAdd } = yield select((state: any) => ({
    previewRecord: state.configureUserGroupController?.previewRecord,
    isAdd: state.configureUserGroupController?.isAdd,
  }));
  if (!lodash.isEmpty(previewRecord) && isAdd) {
    yield put({
      type: 'saveFormData',
      payload: {
        formData: previewRecord,
      },
    });
  }
}

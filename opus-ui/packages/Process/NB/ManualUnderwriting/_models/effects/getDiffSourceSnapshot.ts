import lodash from 'lodash';
import { queryData } from '@/services/dcSnapshotService';
import { NAMESPACE } from '../../activity.config';

export default function* (_, { call, put, select }: any) {
  const { businessNo, taskId } = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.taskDetail
  );
  const response = yield call(queryData, {
    businessNo,
    dataType: 'diffSource',
    taskId,
  });
  if (lodash.isPlainObject(response) && response.success && response.resultData) {
    const diffSource = JSON.parse(response.resultData?.dataValue);
    yield put({
      type: 'saveDiffSource',
      payload: {
        diffSource,
      },
    });
  }
}

import { queryData } from '@/services/dcSnapshotService';
import lodash from 'lodash';
import { safeParseUtil } from '@/utils/utils';

export default function* (action: any, { call, put, select }) {
  const { taskId } = lodash.pick(action?.payload, ['taskId']);
  if (!taskId) {
    return null;
  }
  const response = yield call(queryData, {
    taskId,
    dataType: 'mainPage',
  });

  const data = safeParseUtil(response?.resultData?.dataValue);
  yield put({
    type: 'setMainData',
    payload: {
      mainData: data,
    },
  });
}

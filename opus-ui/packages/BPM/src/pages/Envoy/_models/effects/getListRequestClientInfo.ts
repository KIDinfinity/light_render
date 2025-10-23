import lodash from 'lodash';
import { listRequestClientInfo } from '@/services/envoyMemoControllerService';

function* getListRequestClientInfo({ payload }: any, { call, put, select }: any) {
  const { requestedClientRole } = payload;

  const businessNo = yield select((state: any) => state.envoyController?.businessNo) || '';

  const response = yield call(listRequestClientInfo, {
    businessNo,
    requestedClientRole,
  });

  if (lodash.isPlainObject(response) && response.success && lodash.isArray(response.resultData)) {
    yield put({
      type: 'saveRequestClientInfoList',
      payload: {
        requestClientInfoList: response.resultData,
      },
    });
    return response.resultData;
  }
}

export default getListRequestClientInfo;

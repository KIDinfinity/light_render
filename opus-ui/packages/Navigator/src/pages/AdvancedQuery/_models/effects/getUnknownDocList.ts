import lodash from 'lodash';
import { resRevert } from '@/utils/transform';
import { findDocs } from '@/services/documentSubmissionControllerService';

export default function* (action: any, { put, call }: any) {
  const response = yield call(findDocs, action.payload);
  if (response.success) {
    const list = lodash.get(response, 'resultData.rows', []);
    const result = lodash.set(response, 'resultData.rows', list);
    yield put({
      type: 'saveUnknownDocList',
      payload: {
        list: resRevert(result),
      },
    });
  }
}

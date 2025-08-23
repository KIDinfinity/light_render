import lodash from 'lodash';
import { serialize as objectToFormData } from 'object-to-formdata';
import { attachDocByCaseNo } from '@/services/docViewControllerService';

function* getAttachDocArr(_: any, { call, put, select }: any) {
  const caseNo = yield select((state: any) => state.envoyController.caseNo);
  const response = yield call(
    attachDocByCaseNo,
    objectToFormData({
      caseNo,
    })
  );

  if (lodash.isPlainObject(response) && response.success && lodash.isArray(response.resultData)) {
    yield put({
      type: 'saveAttachDocArr',
      payload: {
        attachDocArr: response.resultData,
      },
    });
  }
}

export default getAttachDocArr;

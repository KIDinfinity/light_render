import lodash from 'lodash';
// import { serialize as objectToFormData } from 'object-to-formdata';
import documentOcrControllerService from '@/services/documentOcrControllerService';

export default function* getLatestOcrStatus({ payload }: any, { call, put }: any) {
  const { caseNo } = payload;
  const response = yield call(documentOcrControllerService.getLatestOcrStatus, {
    caseNo,
  });
  const { success, resultData } = lodash.pick(response, ['success', 'resultData']);
  if (!success && lodash.isEmpty(resultData) && resultData === 'I') {
    // TODO需要判断状态
    yield put({
      type: 'claimEditable/setTaskNotEditable',
      payload: {
        taskNotEditable: false,
      },
    });
  }
}

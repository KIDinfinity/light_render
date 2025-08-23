import lodash from 'lodash';
import docViewControllerService from '@/services/docViewControllerService';

export default function* getCheckExistDoc({ payload }: any, { call, put }: any) {
  // @ts-ignore
  const response = yield call(docViewControllerService.checkExistDoc, payload.businessNos);

  if (response?.success && lodash.isArray(response?.resultData)) {
    yield put({
      type: 'saveExistDocList',
      payload: {
        existDocList: response?.resultData,
      },
    });
  }
}

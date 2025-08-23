import { getPageFieldList } from '@/services/docPageFieldListControllerService';
import lodash from 'lodash';

export default function* getKLIPClaimNo({ payload }: any, { call, put }: any) {
  const caseNo = lodash.get(payload, 'caseNo', '');
  const response = yield call(getPageFieldList, {
    caseNo,
    fieldType: 'klip_claim_no',
  });
  const resultData = lodash.get(response, 'resultData', []);
  if (lodash.isPlainObject(response) && response.success && lodash.isArray(resultData)) {
    yield put({
      type: 'saveKlipClaimNo',
      payload: {
        KLIPClaimNoList: resultData,
      },
    });
  }

  return response;
}

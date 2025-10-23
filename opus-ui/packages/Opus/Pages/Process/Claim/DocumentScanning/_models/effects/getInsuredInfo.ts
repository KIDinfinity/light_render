import lodash from 'lodash';
import { getClaimInfo } from '@/services/claimJpLifejBoControllerService';
import { handleErrorMessageIgnoreXErrorNotice } from '@/utils/commonMessage';

export default function* ({ payload }: any, { select, put, call }: any): Generator<any, any, any> {
  const { policyNo } = payload;

  const params: any = {
    operationType: 'NewRequest',
    policyNo,
  };

  const response: any = yield call(getClaimInfo, params);

  const { success, resultData } = lodash.pick(response, ['success', 'resultData']);

  if (Boolean(success) === false) {
    if (!lodash.isEmpty(policyNo)) {
      handleErrorMessageIgnoreXErrorNotice(response);
    }
    yield put({
      type: 'claimProcessDataResetByField',
      payload: {
        fields: ['policyNo'],
      },
    });
  }

  if (lodash.isPlainObject(resultData) && success && !lodash.isEmpty(resultData)) {
    yield put({
      type: 'claimProcessDataAdd',
      payload: {
        datas: resultData,
      },
    });

    return true;
  }

  return false;
}

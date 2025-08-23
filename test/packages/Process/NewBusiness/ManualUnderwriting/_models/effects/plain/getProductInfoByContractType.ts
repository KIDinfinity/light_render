import lodash from 'lodash';
import { getProductInfoByContractType } from '@/services/owbNbCfgControllerService';
import { serialize as objectToFormData } from 'object-to-formdata';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

export default function* (_: any, { call, put, select }: any) {
  const contractType = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.planInfoData?.caseType
  );

  const businessNo: any = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.processData?.planInfoData?.applicationNo
  );

  if (contractType && businessNo) {
    const response = yield call(
      getProductInfoByContractType,
      objectToFormData({
        contractType,
        applicationNo: businessNo,
      })
    );
    const { success, resultData } = lodash.pick(response, ['success', 'resultData']);
    if (success) {
      yield put({
        type: 'savePlanProdctionConfig',
        payload: {
          planProductConfig: resultData,
        },
      });
      yield put({
        type: 'getRopPlanOptionList'
      })
    }
  }
}

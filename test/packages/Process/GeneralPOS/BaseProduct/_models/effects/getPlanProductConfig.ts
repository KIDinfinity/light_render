import { getProductInfoByContractTypeAndBusinessCode } from '@/services/pcPlanDictProductControllerService';
import lodash from 'lodash';
import { NAMESPACE } from '../../activity.config';

export default function* (_, { call, put, select }: any) {
  const contractType = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.processData?.policyInfo?.policyContractList?.[0]?.contractType
  );

  if (!lodash.isEmpty(contractType)) {
    const response = yield call(getProductInfoByContractTypeAndBusinessCode, {
      contractType: 'TM1',
      businessCode: 'BIZ002',
    });

    yield put({
      type: 'savePlanProductConfig',
      payload: {
        planProductConfig: response?.resultData,
      },
    });
  }
}

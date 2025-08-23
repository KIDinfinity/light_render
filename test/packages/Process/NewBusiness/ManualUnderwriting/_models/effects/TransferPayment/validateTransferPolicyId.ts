import lodash from 'lodash';
import { validateTransfer } from '@/services/owbNbPremiumEnquiryControllerService';

import { NAMESPACE } from '../../../activity.config';

export default function* ({ payload }: any, { put, select }: any): Generator<any, any, any> {
  const { policyId } = payload;
  // 2.FETOBE转化
  const modalData = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.modalData
  ) || {};

  const processData = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData
  ) || {};
  const entities = yield select(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.entities);

  const BEDatas: any = yield put.resolve({
    type: 'getFEToBE',
    payload: {
      processData: { ...processData, ...modalData.processData },
      entities: { ...entities, ...modalData.entities },
    },
  });
  lodash.set(BEDatas, 'policyList[0]validatingTransferPolicyId', policyId);
  const response = yield validateTransfer({
    businessData: {
      ...BEDatas,
    },
  });
  if (
    lodash.isPlainObject(response) &&
    !!response.success &&
    lodash.isString(response.resultData)
  ) {
    yield put({
      type: 'addPaymentTransferItem',
      payload: {
        changedFields: {
          targetPolicyId: policyId,
          policyId: processData.policyId,
          targetApplicationNo: response.resultData,
        },
      },
    });
  }
}

import lodash from 'lodash';
import { validateTransfer } from '@/services/owbNbPremiumEnquiryControllerService';

import { NAMESPACE } from '../../../activity.config';
import { formUtils } from 'basic/components/Form';

export default function* ({ payload }: any, { put, select }: any): Generator<any, any, any> {
  const { policyId, id, addNew = true, businessData } = payload;

  // 2.FETOBE转化
  const modalData = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.modalData
  ) || {};

  const processData = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData
  ) || {};
  const entities = yield select(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.entities);

  let cleanedData: any = {};
  if (businessData) {
    cleanedData = lodash.cloneDeep(businessData);

    cleanedData.policyList[0].premiumTransferList = modalData.processData.premiumTransferList.map(
      (listItem: any) => {
        const { id, policyId, targetPolicyId, amount, status } = listItem;

        return {
          id,
          policyId: formUtils.queryValue(policyId),
          targetPolicyId: formUtils.queryValue(targetPolicyId),
          amount: formUtils.queryValue(amount),
          status: formUtils.queryValue(status),
        };
      }
    );
  }

  const BEDatas: any =
    !!cleanedData && !lodash.isEmpty(cleanedData)
      ? cleanedData
      : yield put.resolve({
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
      type: 'updateTransferPaymentItem',
      payload: {
        id,
        changedFields: {
          targetPolicyId: policyId,
          policyId: processData.policyId,
          targetApplicationNo: response.resultData,
        },
      },
    });

    yield put({
      type: 'setPremiumTransferModalData',
      payload: {
        errorMsgs: [],
      },
    });

    if (addNew) {
      yield put({
        type: 'addPaymentTransferItem',
        payload: {
          changedFields: {
            policyId: processData.policyId,
          },
        },
      });
    }
  } else if (lodash.isPlainObject(response) && response.promptMessages.length) {
    yield put({
      type: 'setPremiumTransferModalData',
      payload: {
        errorMsgs: response.promptMessages,
      },
    });
  }
}

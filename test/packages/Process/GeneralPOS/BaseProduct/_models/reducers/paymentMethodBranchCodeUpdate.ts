/* eslint-disable no-param-reassign */
import { produce } from 'immer';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { transactionId, index, changedFields } = payload;

    const transactionPath = `entities.transactionTypesMap[${transactionId}]`;

    const item = lodash.get(
      draftState,
      `${transactionPath}.paymentMethodList[0].txPmBankList[${index}]`,
      {}
    );
    const newBankCode = lodash.has(changedFields, 'bankCode')
      ? formUtils.queryValue(changedFields?.bankCode)
      : formUtils.queryValue(item.bankCode);

    if (
      lodash.isEmpty(formUtils.queryValue(item.branchCode)) ||
      formUtils.queryValue(item.bankCode) !== newBankCode
    ) {
      lodash.set(
        draftState,
        `${transactionPath}.paymentMethodList[0].txPmBankList[${index}].branchCode`,
        newBankCode
      );
    }
  });

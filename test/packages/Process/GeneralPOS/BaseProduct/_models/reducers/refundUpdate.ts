/* eslint-disable no-param-reassign */
import { produce } from 'immer';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';
export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { transactionId, index, changedFields, validating = false } = payload;
    if (!(lodash.isNumber(index) || lodash.isString(index))) {
      return;
    }
    if (!validating) {
      lodash.set(
        draftState,
        `entities.transactionTypesMap[${transactionId}].transactionTypeCode`,
        formUtils.queryValue(
          draftState.entities.transactionTypesMap[transactionId].transactionTypeCode
        )
      );
    }
    const refundPath = `entities.transactionTypesMap[${transactionId}].refund`;

    if (!lodash.isArray(lodash.get(draftState, `${refundPath}.refundAccountList`))) {
      lodash.set(draftState, `${refundPath}.refundAccountList`, []);
    }
    const refundAccountList = lodash.get(draftState, `${refundPath}.refundAccountList`);
    const refund = lodash.get(draftState, `${refundPath}`);
    lodash.set(draftState, `${refundPath}.refundAccountList[${index}]`, {
      ...refundAccountList[index],
      ...changedFields,
    });
    lodash.set(draftState, `${refundPath}`, {
      ...refund,
      totalRefundAmount: lodash.sum(
        draftState.entities.transactionTypesMap[
          transactionId
        ]?.refund?.refundAccountList?.map((childItem) =>
          Number(formUtils.queryValue(childItem.refundAmount) || 0)
        )
      ),
    });
  });

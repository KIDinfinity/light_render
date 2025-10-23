/* eslint-disable no-param-reassign */
import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const policySubAccountList = draftState.processData?.policyInfo?.policySubAccountList;
    const { transactionId } = payload;
    const refundPath = `entities.transactionTypesMap[${transactionId}].refund`;
    if (!lodash.isArray(lodash.get(draftState, `${refundPath}.refundAccountList`))) {
      lodash.set(draftState, `${refundPath}.refundAccountList`, []);
    }
    if (lodash.size(lodash.get(draftState, `${refundPath}.refundAccountList`)) < 1) {
      lodash.set(
        draftState,
        `${refundPath}.refundAccountList`,
        (policySubAccountList || []).map((item) => ({
          ...item,
          refundAmount: item?.subAcBalance,
          subAcCurrency: item?.subAcCurrency || 'PHP',
        }))
      );
      const refund = lodash.get(draftState, `${refundPath}`);
      lodash.set(draftState, `${refundPath}`, {
        ...refund,
        totalRefundAmount: lodash.sum(
          draftState.entities.transactionTypesMap[transactionId]?.refund?.refundAccountList?.map(
            (childItem) => Number(formUtils.queryValue(childItem.refundAmount) || 0)
          )
        ),
      });
    }
  });

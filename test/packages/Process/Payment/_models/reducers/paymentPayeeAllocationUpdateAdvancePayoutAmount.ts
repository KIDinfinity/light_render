import { produce } from 'immer';
import lodash from 'lodash';

const paymentPayeeAllocationUpdateAdvancePayoutAmount = (state: any, action: any) => {
  return produce(state, (draftState: any) => {
    draftState.claimEntities.beneficiaryListMap = lodash.mapValues(
      draftState?.claimEntities?.beneficiaryListMap,
      (item) => {
        return {
          ...item,
          advancedPayoutDate: null,
          outstandingPayoutAmount: item.beneficiaryAmount,
          advancedPayoutAmount: null,
        };
      }
    );
    return;
  });
};

export default paymentPayeeAllocationUpdateAdvancePayoutAmount;

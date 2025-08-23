import { produce }  from 'immer';
import lodash from 'lodash'
import { formUtils } from 'basic/components/Form';

const updateTransactionTypes = (state: any, action: any) => {
  const transactionType = formUtils.queryValue(action?.payload?.changedFields?.transactionType)

  const nextState = produce(state, (draftState: any) => {
    if(!draftState.claimProcessData?.businessData?.transactionTypes?.[0]) {
      lodash.set(draftState, 'claimProcessData.businessData.transactionTypes', [{}])
    }

    draftState.claimProcessData.businessData.transactionTypes[0].transactionTypeCode = transactionType
  });
  return { ...nextState };
};

export default updateTransactionTypes;

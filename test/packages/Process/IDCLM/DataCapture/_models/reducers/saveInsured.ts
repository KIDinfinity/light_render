import { produce }  from 'immer';
import lodash from 'lodash';
import { getDefaultPayeeId } from 'claim/pages/utils/getPayeeDefaultData';

const saveInsured = (state: any, action: any) => {
  const { changedFields } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    const payeeId = getDefaultPayeeId(draftState.claimEntities.payeeListMap);

    if (lodash.has(changedFields, 'insuredId') && lodash.keys(changedFields).length === 1) {
      delete draftState.claimEntities.payeeListMap[payeeId].payoutCurrency;
      // lodash.set(draftState.claimEntities.payeeListMap[payeeId], 'payoutCurrency', null);
    }

    draftState.claimProcessData.insured = {
      ...draftState.claimProcessData.insured,
      ...changedFields,
    };
  });

  return { ...nextState };
};

export default saveInsured;

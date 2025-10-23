import { produce } from 'immer';
import lodash from 'lodash';

const savePayee = (state: any, action: any) => {
  const { changedFields, payeeId } = action.payload;
  const finalChangedFields = { ...changedFields };

  const nextState = produce(state, (draftState: any) => {
    if (lodash.keys(changedFields).length === 1) {
      if (lodash.has(changedFields, 'bankCode')) {
        finalChangedFields.branchCode = '';
      }
    }

    // eslint-disable-next-line no-param-reassign
    draftState.claimEntities.payeeListMap[payeeId] = {
      ...state.claimEntities.payeeListMap[payeeId],
      ...finalChangedFields,
    };
  });
  return { ...nextState };
};

export default savePayee;

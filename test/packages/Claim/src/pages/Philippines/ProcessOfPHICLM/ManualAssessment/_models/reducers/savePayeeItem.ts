import { produce } from 'immer';
import lodash from 'lodash';

const savePayeeItem = (state: any, action: any) => {
  const { changedFields, payeeId } = action.payload;

  const nextState = produce(state, (draft: any) => {
    const draftState = draft;
    let finalChangedFields = { ...changedFields };

    if (lodash.has(changedFields, 'paymentMethod')) {
      if (changedFields.paymentMethod.value === '02') {
        finalChangedFields = {
          ...finalChangedFields,
          bankCode: undefined,
          bankAccountName: undefined,
          bankAccountNo: undefined,
        };
      }
    }
    draftState.claimEntities.payeeListMap[payeeId] = {
      ...state.claimEntities.payeeListMap[payeeId],
      ...finalChangedFields,
    };
  });

  return { ...nextState };
};

export default savePayeeItem;

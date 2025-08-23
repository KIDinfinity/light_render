import { produce }  from 'immer';

const invoiceUpdate = (state: any, action: any) => {
  const { invoiceId, changedFields } = action.payload;
  const finalChangedFields = { ...changedFields };
  const nextState = produce(state, (draftState: any) => {
    draftState.claimEntities.invoiceListMap[invoiceId] = {
      ...state.claimEntities.invoiceListMap[invoiceId],
      ...finalChangedFields,
    };
  });

  return { ...nextState };
};

export default invoiceUpdate;

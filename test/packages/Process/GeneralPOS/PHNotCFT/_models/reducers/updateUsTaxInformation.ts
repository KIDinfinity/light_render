import { produce }  from 'immer';

const updateUsTaxInformation = (state: any, action: any) => {
  const { usTaxInformation, changedFields } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    // eslint-disable-next-line no-param-reassign
    draftState.claimProcessData.businessData.transactionTypes[0].usTaxInformation = {
      ...draftState.claimProcessData.businessData.transactionTypes[0].usTaxInformation,
      ...usTaxInformation,
      ...changedFields
    };
  });
  return { ...nextState };
};

export default updateUsTaxInformation;

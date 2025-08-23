import { produce }  from 'immer';

const updateUwInfo = (state: any, action: any) => {
  const { changedFields } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    // eslint-disable-next-line no-param-reassign
    draftState.claimProcessData.businessData.transactionTypes[0].uwInformation = {
      ...draftState.claimProcessData.businessData.transactionTypes[0].uwInformation,
      ...changedFields,
    };
  });

  return { ...nextState };
};

export default updateUwInfo;

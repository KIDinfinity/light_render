import { produce }  from 'immer';

const clearSubmitParam = (state: any, action: any) => {
  // TODO: transactionType
  const { policyNo, transactionType } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    // eslint-disable-next-line no-param-reassign
    draftState.claimProcessData = {
      businessData: {
        posNo: '',
        submissionChannel: '',
        posRequestInformation: {
          policyNo,
          transactionType,
        },
      },
    };
  });
  return { ...nextState };
};

export default clearSubmitParam;

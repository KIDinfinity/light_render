import { produce } from 'immer';

const saveInformation = (state: any, action: any) => {
  const { changedFields } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    draftState.claimProcessData.hospitalBillCoverPage = {
      ...draftState.claimProcessData.hospitalBillCoverPage,
      ...changedFields,
    };
  });

  return { ...nextState };
};

export default saveInformation;

import { produce } from 'immer';

const savaBusinessData = (state: any, action: any) => {
  const nextState = produce(state, (draftState: any) => {
    const { changedFields } = action.payload;

    draftState.businessData.claimProcessData[0] = {
      ...draftState.businessData.claimProcessData[0],
      ...changedFields,
    };
  });
  return { ...nextState };
};

export default savaBusinessData;

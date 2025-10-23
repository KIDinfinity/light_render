import { produce } from 'immer';

const savaBusinessData = (state: any) => {
  const nextState = produce(state, (draftState: any) => {
    draftState.businessData.claimProcessData = [{}];
  });
  return { ...nextState };
};

export default savaBusinessData;

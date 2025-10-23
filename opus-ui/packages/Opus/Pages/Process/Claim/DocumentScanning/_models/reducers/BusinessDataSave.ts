import { produce } from 'immer';

const BusinessDataSave = (state: any, action: any) => {
  const nextState = produce(state, (draftState: any) => {
    const { businessData } = action.payload;

    draftState.businessData = { ...businessData };
  });
  return { ...nextState };
};

export default BusinessDataSave;

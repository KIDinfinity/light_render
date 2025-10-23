import { produce } from 'immer';

const savaType = (state: any, action: any) => {
  const nextState = produce(state, (draftState: any) => {
    const { type } = action.payload;

    draftState.businessData.type = type;
  });
  return { ...nextState };
};

export default savaType;

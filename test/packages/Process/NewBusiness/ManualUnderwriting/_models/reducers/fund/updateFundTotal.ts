import { produce } from 'immer';

type TAction = {
  type: any;
  payload: {
    changedFields: Record<string, any>;
  };
};

export default (state: any, action: TAction) => {
  const { changedFields } = action?.payload;

  const nextState = produce(state, (draftState: any) => {
    draftState.modalData.fund.fundTotal = {
      ...changedFields,
    };
  });
  return { ...nextState };
};

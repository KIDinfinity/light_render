import { produce } from 'immer';

const setBreakdownConfirm = (state: any, action: any) => {
  const nextState = produce(state, (draftState: any) => {
    draftState.breakdownConfirmServiceItemId = action.payload?.serviceItemId || '';
  });

  return { ...nextState };
};

export default setBreakdownConfirm;

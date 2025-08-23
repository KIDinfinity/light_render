import { produce } from 'immer';

const serviceItemBreakdownDelete = (state: any) => {
  const nextState = produce(state, (draftState: any) => {
    draftState.claimServiceItemBreakDownList = [];
    draftState.isShowServiceItemBreakdown = false;
  });

  return { ...nextState };
};

export default serviceItemBreakdownDelete;

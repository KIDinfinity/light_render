import { produce }  from 'immer';

const hideExchangeDateModal = (state: any,action: any) => {
  const { exchangeDateModalShowStatus } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    draftState.exchangeDateModalShowStatus = exchangeDateModalShowStatus;
  });
  return { ...nextState };
};

export default hideExchangeDateModal;

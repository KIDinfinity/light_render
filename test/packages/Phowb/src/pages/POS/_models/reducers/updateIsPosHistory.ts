import { produce }  from 'immer';

export default (state: any, action: any) => {
  const { isPOSHistory } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    // eslint-disable-next-line no-param-reassign
    draftState.isPOSHistory = isPOSHistory;
  });
  return { ...nextState };
};

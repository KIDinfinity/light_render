import { produce }  from 'immer';

export default (state: any, action: any) => {
  const { allFundConfigList } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.allFundConfigList = {
      ...draftState.allFundConfigList,
      ...allFundConfigList,
    };
  });
  return { ...nextState };
};

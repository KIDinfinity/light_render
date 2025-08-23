import { produce }  from 'immer';

export default (state: any, action: any) => {
  const { allFundConfigList, allFundConfigListMap } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.allFundConfigList = allFundConfigList;
    draftState.allFundConfigListMap = allFundConfigListMap;
  });
  return { ...nextState };
};

import { produce }  from 'immer';

export default (state: any, action: any) => {
  const { operationList } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.functionData.operationList = operationList;
  });
  return { ...nextState };
};

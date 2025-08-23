import { produce } from 'immer';

export default (state: any, action: any) => {
  const { applicationNo, changedFields } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    draftState.claimProcessData.claimEntities.claimApplicationDocList[applicationNo] = {
      ...draftState.claimProcessData.claimEntities.claimApplicationDocList[applicationNo],
      ...changedFields,
    };
  });

  return { ...nextState };
};

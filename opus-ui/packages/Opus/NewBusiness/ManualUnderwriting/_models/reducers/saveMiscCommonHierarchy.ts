import { produce } from 'immer';

export default (state: any, action: any) => {
  const { miscCommonHierarchy } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    draftState.miscCommonHierarchy = miscCommonHierarchy;
  });

  return {
    ...nextState,
  };
};

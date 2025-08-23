import { produce }  from 'immer';

const saveSearchInsuredObj = (state: any, action: any) => {
  const { changedFields } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.searchInsuredObj = {
      ...draftState.searchInsuredObj,
      ...changedFields,
    };
  });

  return { ...nextState };
};

export default saveSearchInsuredObj;

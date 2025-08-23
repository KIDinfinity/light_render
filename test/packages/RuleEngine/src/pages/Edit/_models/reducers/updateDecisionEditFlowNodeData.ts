import { produce }  from 'immer';

const updateDecisionEditFlowNodeData = (state: any, action: any) => {
  const { changedFields } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    // eslint-disable-next-line no-param-reassign
    draftState.decisionEditData.flowNodeVO = {
      ...draftState.decisionEditData.flowNodeVO,
      ...changedFields,
    };
  });

  return { ...nextState };
};

export default updateDecisionEditFlowNodeData;

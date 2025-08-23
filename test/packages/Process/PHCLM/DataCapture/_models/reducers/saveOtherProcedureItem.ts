import { produce }  from 'immer';

const saveOtherProcedureItem = (state: any, action: any) => {
  const { changedFields, otherProcedureId } = action.payload;
  const finalChangedFields = { ...changedFields };

  const nextState = produce(state, (draftState) => {
    draftState.claimEntities.otherProcedureListMap[otherProcedureId] = {
      ...state.claimEntities.otherProcedureListMap[otherProcedureId],
      ...finalChangedFields,
    };
  });
  return { ...nextState };
};

export default saveOtherProcedureItem;

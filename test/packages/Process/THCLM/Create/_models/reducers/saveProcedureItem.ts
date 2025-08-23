import { produce }  from 'immer';

const saveProcedureItem = (state: any, action: any) => {
  const { procedureId, changedFields } = action.payload;
  const finalChangedFields = { ...changedFields };

  const nextState = produce(state, (draftState) => {
    draftState.claimEntities.procedureListMap[procedureId] = {
      ...state.claimEntities.procedureListMap[procedureId],
      ...finalChangedFields,
    };
  });

  return { ...nextState };
};

export default saveProcedureItem;

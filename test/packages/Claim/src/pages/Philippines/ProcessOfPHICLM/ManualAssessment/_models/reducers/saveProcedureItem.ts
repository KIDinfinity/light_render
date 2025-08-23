import { produce } from 'immer';

const saveProcedureItem = (state: any, action: any) => {
  const { procedureId, changedFields } = action.payload;

  const nextState = produce(state, (draft: any) => {
    const draftState = draft;
    draftState.claimEntities.procedureListMap[procedureId] = {
      ...state.claimEntities.procedureListMap[procedureId],
      ...changedFields,
    };
  });

  return { ...nextState };
};

export default saveProcedureItem;

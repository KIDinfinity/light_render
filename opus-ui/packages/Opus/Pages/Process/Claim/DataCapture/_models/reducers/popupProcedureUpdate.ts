import { produce } from 'immer';

const procedureUpdate = (state: any, action: any) => {
  const { procedureId, changedFields, incidentId } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.integration[incidentId].procedureListMap[procedureId] = {
      ...draftState.integration[incidentId].procedureListMap[procedureId],
      ...changedFields,
    };
  });

  return { ...nextState };
};

export default procedureUpdate;

import { produce } from 'immer';
import lodash from 'lodash';

const removeProcedureItem = (state: any, action: any) => {
  const { treatmentId, procedureId } = action.payload;
  const newProcedureList = lodash.filter(
    state.claimEntities.treatmentListMap[treatmentId].procedureList,
    (item) => item !== procedureId
  );

  const nextState = produce(state, (draft: any) => {
    const draftState = draft;
    draftState.claimEntities.treatmentListMap[treatmentId].procedureList = newProcedureList;
    delete draftState.claimEntities.procedureListMap[procedureId];
  });

  return { ...nextState };
};

export default removeProcedureItem;

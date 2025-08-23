import lodash from 'lodash';
import { produce } from 'immer';
import { deleteErrorMessages } from '../functions';

const removeProcedureItem = (state: any, action: any) => {
  const { treatmentId, procedureId } = action.payload;
  const newProcedureList = lodash.filter(
    state.claimEntities.treatmentListMap[treatmentId].procedureList,
    (item) => item !== procedureId
  );

  const nextState = produce(state, (draftState: any) => {
    draftState.claimEntities.treatmentListMap[treatmentId].procedureList = newProcedureList;
    deleteErrorMessages.deleteProcedure(draftState.claimEntities.procedureListMap, procedureId);
    delete draftState.claimEntities.procedureListMap[procedureId];
  });

  return { ...nextState };
};

export default removeProcedureItem;

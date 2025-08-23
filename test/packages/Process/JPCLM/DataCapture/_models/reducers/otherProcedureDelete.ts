import { produce }  from 'immer';
import lodash from 'lodash';

const otherProcedureDelete = (state: any, action: any) => {
  const { treatmentId, otherProcedureId } = action.payload;
  const newRadiationList = lodash.filter(
    state.claimEntities.treatmentListMap[treatmentId].otherProcedureList,
    (item) => item !== otherProcedureId
  );

  const nextState = produce(state, (draftState) => {
    draftState.claimEntities.treatmentListMap[treatmentId].otherProcedureList = newRadiationList;
    delete draftState.claimEntities.otherProcedureListMap[otherProcedureId];
  });

  return { ...nextState };
};

export default otherProcedureDelete;

import { produce } from 'immer';
import lodash from 'lodash';

const removeOtherProcedureItem = (state: any, action: any) => {
  const { treatmentId, otherProcedureId } = action.payload;

  const newOtherProcedureList = lodash.filter(
    state.claimEntities.treatmentListMap[treatmentId].otherProcedureList,
    (item) => item !== otherProcedureId
  );

  const nextState = produce(state, (draftState: any) => {
    draftState.claimEntities.treatmentListMap[
      treatmentId
    ].otherProcedureList = newOtherProcedureList;
    delete draftState.claimEntities.otherProcedureListMap[otherProcedureId];
  });

  return { ...nextState };
};

export default removeOtherProcedureItem;

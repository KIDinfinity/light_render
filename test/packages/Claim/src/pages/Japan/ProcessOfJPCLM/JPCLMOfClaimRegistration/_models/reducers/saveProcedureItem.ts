import { produce } from 'immer';
import lodash, { cloneDeep } from 'lodash';
import saveTreatmentItemCallback from './saveTreatmentItemCallback';
import validateDuplicateProcedure from './validateDuplicateProcedure';

const saveProcedureItem = (state: any, action: any) => {
  const { procedureId, changedFields } = action.payload;

  const nextState = produce(state, (draftState) => {
    draftState.claimEntities.procedureListMap[procedureId] = {
      ...state.claimEntities.procedureListMap[procedureId],
      ...changedFields,
    };
  });

  let finalState: any = nextState;

  if (lodash.has(changedFields, 'operationDateString')) {
    finalState = validateDuplicateProcedure(nextState, action.payload);
  }

  finalState = saveTreatmentItemCallback(cloneDeep(finalState), action);

  return { ...finalState };
};

export default saveProcedureItem;

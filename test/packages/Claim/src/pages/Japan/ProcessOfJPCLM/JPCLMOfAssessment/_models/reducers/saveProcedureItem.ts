import { produce } from 'immer';
import { cloneDeep, has, keys } from 'lodash';
import { deleteErrorMessages } from '../functions';

const saveProcedureItem = (state: any, action: any) => {
  const { changedFields, procedureId } = action.payload;
  const finalChangedFields = { ...changedFields };

  const nextState = produce(state, (draftState: any) => {
    const procedureCur = draftState.claimEntities.procedureListMap[procedureId];
    const procedureTemp = cloneDeep(draftState.claimEntities.procedureListMap);
    procedureTemp[procedureId] = {
      ...procedureCur,
      ...finalChangedFields,
    };
    if (has(changedFields, 'operationDate') && keys(changedFields).length === 1) {
      deleteErrorMessages.deleteProcedure(procedureTemp, procedureId);
    }
    draftState.claimEntities.procedureListMap = procedureTemp;
  });

  return { ...nextState };
};

export default saveProcedureItem;

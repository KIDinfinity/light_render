import { produce }  from 'immer';
import lodash from 'lodash';

const saveProcedureItem = (state: any, action: any) => {
  const { procedureId, changedFields } = action.payload;
  const finalChangedFields = { ...changedFields };

  const nextState = produce(state, (draftState) => {
    if (lodash.has(changedFields, 'procedureCode')) {
      if (changedFields.procedureCode.value !== 'OTHS') {
        finalChangedFields.procedureDescription = null;
      }
    }
    draftState.claimEntities.procedureListMap[procedureId] = {
      ...state.claimEntities.procedureListMap[procedureId],
      ...finalChangedFields,
    };
  });

  return { ...nextState };
};

export default saveProcedureItem;

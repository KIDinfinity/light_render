import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

const saveProcedureItem = (state: any, action: any) => {
  const { procedureId, changedFields } = action.payload;
  const finalChangedFields = { ...changedFields };

  const nextState = produce(state, (draftState) => {
    if (lodash.has(changedFields, 'procedureCode') && lodash.size(changedFields) === 1) {
      if (changedFields.procedureCode?.value !== 'OTHS') {
        finalChangedFields.procedureDescription = null;
      }
    }

    if (lodash.has(changedFields, 'procedureName') && lodash.size(changedFields) === 1) {
      finalChangedFields.procedureName = lodash.replace(
        formUtils.queryValue(changedFields?.procedureName),
        /.*-/,
        ''
      );
      finalChangedFields.partOfBody = '';
    }

    draftState.claimEntities.procedureListMap[procedureId] = {
      ...state.claimEntities.procedureListMap[procedureId],
      ...finalChangedFields,
    };
  });

  return { ...nextState };
};

export default saveProcedureItem;

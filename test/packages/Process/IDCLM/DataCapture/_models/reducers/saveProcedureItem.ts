import { produce }  from 'immer';
import lodash from 'lodash';
import getOrderByProcedureList from 'claim/utils/getOrderByProcedureList';
import { formUtils } from 'basic/components/Form';

const saveProcedureItem = (state: any, action: any) => {
  const { procedureId, changedFields, treatmentId } = action.payload;
  const finalChangedFields = { ...changedFields };

  const nextState = produce(state, (draftState) => {
    const procedureListMap = draftState?.claimEntities?.procedureListMap;
    const procedureList = draftState?.claimEntities?.treatmentListMap?.[treatmentId]?.procedureList;
    const fieldsArray = Object.entries(changedFields);
    if (fieldsArray.length === 1) {
      if (
        lodash.has(changedFields, 'therapiesType') &&
        lodash.isEmpty(formUtils.queryValue(changedFields.therapiesType))
      ) {
        finalChangedFields.operationDate = null;
        finalChangedFields.procedureDescription = null;
        finalChangedFields.procedureCode = null;
        finalChangedFields.surgeryCategory = null;
      }
    }

    draftState.claimEntities.procedureListMap[procedureId] = {
      ...draftState.claimEntities.procedureListMap[procedureId],
      ...finalChangedFields,
    };
    if (lodash.has(changedFields, 'operationDate')) {
      draftState.claimEntities.treatmentListMap[
        treatmentId
      ].procedureList = getOrderByProcedureList(procedureListMap, procedureList);
    }
  });

  return { ...nextState };
};

export default saveProcedureItem;

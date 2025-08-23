import { produce } from 'immer';
import lodash from 'lodash';
import getOrderByProcedureList from 'claim/utils/getOrderByProcedureList';
import { formUtils } from 'basic/components/Form';

const saveProcedureItem = (state: any, action: any) => {
  const { procedureId, changedFields, treatmentId } = action.payload;
  const finalChangedFields = { ...changedFields };

  const nextState = produce(state, (draftState: any) => {
    const procedureListMap = draftState?.claimEntities?.procedureListMap;
    const procedureList = draftState?.claimEntities?.treatmentListMap?.[treatmentId]?.procedureList;

    const fieldsArray = Object.entries(changedFields);

    if (fieldsArray.length === 1) {
      if (lodash.has(changedFields, 'procedureCode')) {
        if (changedFields.procedureCode.value !== 'OTHS') {
          finalChangedFields.procedureDescription = null;
        }
        draftState.claimEntities.serviceItemListMap = lodash.reduce(
          lodash.cloneDeep(draftState.claimEntities.serviceItemListMap),
          (map: Object, item: any, key: string) => {
            return {
              ...map,
              [key]:
                formUtils.queryValue(item.procedureCode) === procedureId
                  ? { ...item, procedureCode: '' }
                  : item,
            };
          },
          {}
        );
      }
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
      ...state.claimEntities.procedureListMap[procedureId],
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

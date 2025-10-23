import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { VLD_000095 } from '@/utils/validations';
import { ProcedureType } from '../../../utils/constant';

const saveOtherProcedureItem = (state: any, action: any) => {
  const nextState = produce(state, (draftState: any) => {
    const { changedFields, otherProcedureId } = action.payload;

    let finalChangedFields = { ...changedFields };

    if (lodash.has(changedFields, 'procedureType')) {
      if (String(formUtils.queryValue(changedFields.procedureType)) === ProcedureType.Radioactive) {
        finalChangedFields.procedureName = null;
        finalChangedFields.expense = null;
        finalChangedFields.advancedTreatmentCode = null;
      }
      if (String(formUtils.queryValue(changedFields.procedureType)) === ProcedureType.Advanced) {
        finalChangedFields.partOfBody = null;
        finalChangedFields.procedureCode = null;
      }
    }

    draftState.claimEntities.otherProcedureListMap[otherProcedureId] = {
      ...state.claimEntities.otherProcedureListMap[otherProcedureId],
      ...finalChangedFields,
    };
    const otherProcedureItem = state.claimEntities.otherProcedureListMap[otherProcedureId];
    finalChangedFields = VLD_000095(otherProcedureItem, 'fromDate', 'toDate', finalChangedFields);
  });

  return { ...nextState };
};

export default saveOtherProcedureItem;

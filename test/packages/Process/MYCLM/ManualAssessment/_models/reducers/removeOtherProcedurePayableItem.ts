import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { updateDuplicatePayableError } from '../functions';

const removeOtherProcedurePayableItem = (state: any, action: any) => {
  const { treatmentPayableId, id } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    const draft = draftState;
    const editPayable = formUtils.cleanValidateData(
      draft.claimEntities.otherProcedurePayableListMap[id]
    );
    updateDuplicatePayableError(
      draft,
      {
        editPayable,
        benefitItemCode: editPayable.benefitItemCode,
      },
      'otherProcedurePayable'
    );

    const otherProcedurePayableList = lodash.get(
      draft,
      `claimEntities.treatmentPayableListMap.${treatmentPayableId}.otherProcedurePayableList`,
      []
    );
    const newRadiationList = lodash.filter(otherProcedurePayableList, (item) => item !== id);
    draft.claimEntities.treatmentPayableListMap[
      treatmentPayableId
    ].otherProcedurePayableList = newRadiationList;
    delete draft.claimEntities.otherProcedurePayableListMap[id];
  });

  return { ...nextState };
};

export default removeOtherProcedurePayableItem;

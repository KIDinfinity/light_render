import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import links from '../links';

const treatmentUpdate = (state: any, action: any) => {
  const { changedFields, treatmentId } = action.payload;

  const nextState = produce(state, (draftState) => {
    const treatmentItem = draftState.claimEntities?.treatmentListMap?.[treatmentId] || {};
    draftState.claimEntities.treatmentListMap[treatmentId] = {
      ...draftState.claimEntities.treatmentListMap[treatmentId],
      ...changedFields,
    };

    if (lodash.size(changedFields) === 1) {
      // 如果不为OP,要把原来的opTreatmentList删除，否则后端理算会出错
      if (
        lodash.has(changedFields, 'treatmentType') &&
        formUtils.queryValue(changedFields.treatmentType) !== 'OP' &&
        !!treatmentItem?.opTreatmentList
      ) {
        delete treatmentItem.opTreatmentList;
      }
      links.treatment_treatmentType({ draftState, changedFields, treatmentId });
      links.treatment_medicalProvider({ draftState, changedFields, treatmentId });
    }
  });
  return { ...nextState };
};

export default treatmentUpdate;

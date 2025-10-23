import { produce } from 'immer';
import lodash from 'lodash';
import links from '../links';
import { deleteOpTreatmentPayable } from '../functions';
import { formUtils } from 'basic/components/Form';
import { TreatmentType } from '../enum';

const saveTreatmentItem = (state: any, action: any) => {
  const { changedFields, treatmentId } = action.payload;
  const finalChangedFields = { ...changedFields };
  const nextState = produce(state, (draftState) => {
    const fieldsArray = Object.entries(changedFields);
    const treatmentItem = draftState.claimEntities?.treatmentListMap?.[treatmentId] || {};

    // 如果不为OP,要把原来的opTreatmentList删除，否则后端理算会出错
    if (fieldsArray.length === 1 && lodash.has(changedFields, 'treatmentType')) {
      if (
        formUtils.queryValue(changedFields.treatmentType) !== TreatmentType.OP &&
        !!treatmentItem?.opTreatmentList
      ) {
        const outpatientTreatmentDateList = lodash
          .chain(formUtils.cleanValidateData(treatmentItem.opTreatmentList))
          .map('outpatientTreatmentDate')
          .value();
        lodash.forEach(outpatientTreatmentDateList, (date) => {
          deleteOpTreatmentPayable({ draftState, treatmentId, outpatientTreatmentDate: date });
        });
        delete treatmentItem.opTreatmentList;
        draftState.claimEntities.treatmentListMap[treatmentId] = {
          ...treatmentItem,
          ...finalChangedFields,
        };
      }

      if (formUtils.queryValue(changedFields.treatmentType) === TreatmentType.OP) {
        delete treatmentItem.dateOfAdmission;
        delete treatmentItem.dateOfDischarge;
        draftState.claimEntities.treatmentListMap[treatmentId] = {
          ...treatmentItem,
          ...finalChangedFields,
        };
      }
    }

    if (fieldsArray.length === 1) {
      links.treatment_icu({ draftState, changedFields, treatmentId });
      links.treatment_treatmentType({ draftState, changedFields, treatmentId });
      links.treatment_medicalProvider({ draftState, changedFields, treatmentId });
    }
    draftState.claimEntities.treatmentListMap[treatmentId] = {
      ...treatmentItem,
      ...finalChangedFields,
    };
  });
  return { ...nextState };
};

export default saveTreatmentItem;

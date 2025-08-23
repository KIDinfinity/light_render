import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { deleteOpTreatmentPayable } from 'process/JPCLM/ManualAssessment/_models/functions'

const opTreatmentListDelete = (state: any, action: any) => {
  const { treatmentId, deleteDate, group } = action.payload;

  const nextState = produce(state, (draftState) => {
    const draft = draftState;
    const opTreatmentList = draft.claimEntities?.treatmentListMap?.[treatmentId]?.opTreatmentList
    const newOpTreatmentList = lodash
      .chain(draft.claimEntities?.treatmentListMap?.[treatmentId]?.opTreatmentList)
      .cloneDeep()
      .remove((item) => {
        if (group) {
          return item.group !== group;
        }
        if (deleteDate) {
          return item.outpatientTreatmentDate !== deleteDate;
        }
      })
      .value();

    draft.claimEntities.treatmentListMap[treatmentId].opTreatmentList = [
      ...(newOpTreatmentList || []),
    ];

    if (group) {
      const outpatientTreatmentDateList = lodash
        .chain(formUtils.cleanValidateData(opTreatmentList))
        .filter((item) => item.group === group)
        .map('outpatientTreatmentDate')
        .value()
      lodash.forEach(outpatientTreatmentDateList, (date) => {
        deleteOpTreatmentPayable({ draftState, treatmentId, outpatientTreatmentDate: date })
      })
    }
    if (deleteDate) {
      deleteOpTreatmentPayable({ draftState, treatmentId, outpatientTreatmentDate: deleteDate })
    }

  });

  return { ...nextState };
};

export default opTreatmentListDelete;

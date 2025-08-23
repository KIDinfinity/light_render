import { produce }  from 'immer';
import lodash from 'lodash';

const opTreatmentListDelete = (state: any, action: any) => {
  const { treatmentId, deleteDate, group } = action.payload;

  const nextState = produce(state, (draftState) => {
    const draft = draftState;
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
  });

  return { ...nextState };
};

export default opTreatmentListDelete;

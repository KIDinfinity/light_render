import { produce } from 'immer';

const opTreatmentListDelete = (state: any, action: any) => {
  const { treatmentId, deleteDate, groupId } = action.payload;

  const nextState = produce(state, (draftState) => {
    const treatment = draftState.claimEntities?.treatmentListMap?.[treatmentId];
    if (deleteDate) {
      const groupItems = treatment.opTreatmentList.filter((item) => item.group === groupId);
      if (groupItems.length === 1 && groupItems[0].outpatientTreatmentDate === deleteDate) {
        groupItems[0].outpatientTreatmentDate = '';
        return draftState;
      }
    }
    treatment.opTreatmentList =
      treatment.opTreatmentList?.filter((item) => {
        return (
          item.group !== groupId || (deleteDate && deleteDate !== item.outpatientTreatmentDate)
        );
      }) || [];
    return draftState;
  });

  return { ...nextState };
};

export default opTreatmentListDelete;

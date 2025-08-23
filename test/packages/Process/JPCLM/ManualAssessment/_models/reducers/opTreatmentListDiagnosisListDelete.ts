import { produce }  from 'immer';
import lodash from 'lodash';

const opTreatmentListDiagnosisListDelete = (state: any, action: any) => {
  const { treatmentId, group, diagnosisNameId } = action.payload;

  const nextState = produce(state, (draftState) => {
    const draft = draftState;
    const opTreatmentList = lodash.cloneDeep(
      draft.claimEntities?.treatmentListMap?.[treatmentId]?.opTreatmentList
    );

    draft.claimEntities.treatmentListMap[treatmentId].opTreatmentList = lodash
      .chain(opTreatmentList)
      .map((outpatientItem: any) => {
        return outpatientItem.group === group
          ? {
              ...outpatientItem,
              diagnosisIdList: lodash.filter(
                outpatientItem?.diagnosisIdList || [],
                (id: any) => id !== diagnosisNameId
              ),
            }
          : outpatientItem;
      })
      .value();
  });

  return { ...nextState };
};

export default opTreatmentListDiagnosisListDelete;

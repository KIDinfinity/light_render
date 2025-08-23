import lodash from 'lodash';

export default ({ draftState, changedFields, diagnosisId }: any) => {
  if (!lodash.has(changedFields, 'criticalIllness')) return;
  const draft = draftState;
  if (!changedFields.criticalIllness.value) {
    draft.claimEntities.diagnosisListMap[diagnosisId] = {
      ...draftState.claimEntities.diagnosisListMap[diagnosisId],
      criticalIllnessName: '',
    };
  }
};

import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

const saveDiagnosisItem = (state: any, action: any) => {
  const { changedFields, diagnosisId } = action.payload;
  const finalChangedFields = { ...changedFields };

  const nextState = produce(state, (draft: any) => {
    const draftState = draft;
    if (
      lodash.has(changedFields, 'criticalIllness') &&
      lodash.isBoolean(formUtils.queryValue(changedFields.criticalIllness))
    ) {
      finalChangedFields.criticalIllness = formUtils.queryValue(changedFields.criticalIllness)
        ? 1
        : 0;
      // TODO 如何保留上次输入
      finalChangedFields.criticalIllnessName = '';
    }

    draftState.claimEntities.diagnosisListMap[diagnosisId] = {
      ...state.claimEntities.diagnosisListMap[diagnosisId],
      ...finalChangedFields,
    };
  });
  return { ...nextState };
};

export default saveDiagnosisItem;

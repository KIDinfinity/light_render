import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

const saveDiagnosisItem = (state: any, action: any) => {
  const { changedFields, diagnosisId } = action.payload;
  const finalChangedFields = { ...changedFields };

  const nextState = produce(state, (draftState) => {
    if (lodash.size(changedFields) > 1) return;
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
    if (lodash.has(changedFields, 'diagnosisCode')) {
      const { locale_new } = changedFields.diagnosisCode;
      const diagnosisValueArr = locale_new.split('-');
      const diagnosisName = diagnosisValueArr[1] || ''
      finalChangedFields.diagnosisName = diagnosisName;
    }
    draftState.claimEntities.diagnosisListMap[diagnosisId] = {
      ...state.claimEntities.diagnosisListMap[diagnosisId],
      ...finalChangedFields,
    };
  });
  return { ...nextState };
};

export default saveDiagnosisItem;

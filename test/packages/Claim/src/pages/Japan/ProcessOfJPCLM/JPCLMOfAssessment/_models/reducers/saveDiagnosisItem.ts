import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

const saveDiagnosisItem = (state: any, action: any) => {
  const { changedFields, diagnosisId } = action.payload;
  const finalChangedFields = { ...changedFields };

  const nextState = produce(state, (draftState: any) => {
    if (lodash.has(changedFields, 'diagnosisType')) {
      if (finalChangedFields.diagnosisType.value === 'C') {
        finalChangedFields.dateOfOnset = null;
      }
      if (
        finalChangedFields.diagnosisType.value === 'C' ||
        finalChangedFields.diagnosisType.value === 'S'
      ) {
        finalChangedFields.diagnosticPathology = '02';
        finalChangedFields.diagnosisDate = null;
        finalChangedFields.pathologicalName = '';
        finalChangedFields.malignantNeoplasmType = '';
        finalChangedFields.depthOfColorectalCancer = '';
        finalChangedFields.firstDeterminationDate = null;
      }
    }
    if (
      lodash.has(changedFields, 'diagnosticPathology') &&
      formUtils.queryValue(changedFields.diagnosticPathology) !== '01'
    ) {
      finalChangedFields.determinationDate = null;
      finalChangedFields.pathologicalName = null;
    }

    // eslint-disable-next-line no-param-reassign
    draftState.claimEntities.diagnosisListMap[diagnosisId] = {
      ...state.claimEntities.diagnosisListMap[diagnosisId],
      ...finalChangedFields,
    };
  });

  return { ...nextState };
};

export default saveDiagnosisItem;

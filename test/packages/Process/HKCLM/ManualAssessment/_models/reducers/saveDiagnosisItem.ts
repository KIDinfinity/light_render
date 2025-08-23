/* eslint-disable no-param-reassign */
import { produce }  from 'immer';
import lodash from 'lodash';

import { formUtils } from 'basic/components/Form';

const saveDiagnosisItem = (state: any, action: any) => {
  const { changedFields, incidentId, diagnosisId } = action.payload;
  const finalChangedFields = { ...changedFields };

  const nextState = produce(state, (draftState: any) => {
    if (lodash.size(changedFields) > 1) {
      draftState.claimEntities.diagnosisListMap[diagnosisId] = {
        ...draftState.claimEntities.diagnosisListMap[diagnosisId],
        ...finalChangedFields,
      };
      return;
    }

    if (lodash.has(changedFields, 'criticalIllness')) {
      if (formUtils.queryValue(changedFields.criticalIllness) === 0) {
        finalChangedFields.criticalIllnessName = '';
      }
    }

    if (lodash.has(changedFields, 'diagnosisCode')) {
      const { locale_new } = changedFields.diagnosisCode;
      const diagnosisValueArr = locale_new.split('-');
      const diagnosisName = diagnosisValueArr[1] || '';
      finalChangedFields.diagnosisName = diagnosisName;
    }

    if (lodash.has(changedFields, 'diagnosisType') && changedFields.diagnosisType.value !== 'P') {
      const diagnosisList = draftState.claimEntities.incidentListMap[incidentId]?.diagnosisList;
      const duplicateDiagnosisList = lodash
        .chain(diagnosisList)
        .map((id: any) => draftState.claimEntities.diagnosisListMap[id])
        .filter((item) => formUtils.queryValue(item.diagnosisType) === 'P')
        .value();
      lodash.forEach(duplicateDiagnosisList, (item) => {
        if (lodash.isObject(draftState.claimEntities.diagnosisListMap[item.id].diagnosisType)) {
          draftState.claimEntities.diagnosisListMap[item.id].diagnosisType.errors = null;
        }
      });
    }

    draftState.claimEntities.diagnosisListMap[diagnosisId] = {
      ...draftState.claimEntities.diagnosisListMap[diagnosisId],
      ...finalChangedFields,
    };
  });

  return { ...nextState };
};

export default saveDiagnosisItem;

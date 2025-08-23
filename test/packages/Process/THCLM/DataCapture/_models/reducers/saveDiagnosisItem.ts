/* eslint-disable no-param-reassign */
import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

export default (state: any, action: any) =>
  produce(state, (draftState: any) => {
    const { changedFields, diagnosisId } = action.payload;

    if (lodash.size(changedFields) > 1) {
      draftState.claimEntities.diagnosisListMap[diagnosisId] = {
        ...draftState.claimEntities.diagnosisListMap[diagnosisId],
        ...changedFields,
      };
      return;
    }

    const finalChangedFields = { ...changedFields };

    if (lodash.has(changedFields, 'diagnosisCode')) {
      finalChangedFields.diagnosisName =
        lodash.chain(changedFields).get('diagnosisCode.locale_new').split('-').get(1).value() || '';
    }

    if (lodash.has(changedFields, 'criticalIllness')) {
      if (formUtils.queryValue(changedFields.criticalIllness) === 0) {
        finalChangedFields.criticalIllnessName = '';
      }
    }

    draftState.claimEntities.diagnosisListMap[diagnosisId] = {
      ...draftState.claimEntities.diagnosisListMap[diagnosisId],
      ...finalChangedFields,
    };
  });

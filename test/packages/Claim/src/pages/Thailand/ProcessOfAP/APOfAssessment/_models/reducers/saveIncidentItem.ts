import { produce } from 'immer';
import lodash from 'lodash';

import { APDAClaimType } from 'claim/enum/APDAClaimType';
import { formUtils } from 'basic/components/Form';

const saveIncidentItem = (state: any, action: any) => {
  const { changedFields, incidentId } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    if (changedFields.claimType && lodash.size(changedFields) === 1) {
      changedFields.subClaimType = ''
      changedFields.claimTypeArray = [formUtils.queryValue(changedFields.claimType)];
      const treatmentList = lodash.get(
        state,
        `claimEntities.incidentListMap.${incidentId}.treatmentList`,
        []
      );
      if (formUtils.queryValue(changedFields.claimType) === APDAClaimType.IPD) {
        lodash.forEach(treatmentList, (id) =>
          lodash.set(draftState, `claimEntities.treatmentListMap.${id}.dateOfConsultation`, null)
        );
      }
      if (formUtils.queryValue(changedFields.claimType) === APDAClaimType.OPD) {
        lodash.forEach(treatmentList, (id) =>
          lodash.set(draftState, `claimEntities.treatmentListMap.${id}.dateOfAdmission`, null)
        );
      }
    }
    draftState.claimEntities.incidentListMap[incidentId] = {
      ...state.claimEntities.incidentListMap[incidentId],
      ...changedFields,
    };
  });
  return { ...nextState };
};

export default saveIncidentItem;

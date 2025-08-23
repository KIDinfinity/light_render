import { produce } from 'immer';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';

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
      if (formUtils.queryValue(changedFields.claimType) === 'IP') {
        lodash.forEach(
          treatmentList,
          (item) => (draftState.claimEntities.treatmentListMap[item].dateOfVisit = null)
        );
      }
      if (formUtils.queryValue(changedFields.claimType) === 'OP') {
        lodash.forEach(treatmentList, (item) => {
          draftState.claimEntities.treatmentListMap[item].dateOfAdmission = null;
          draftState.claimEntities.treatmentListMap[item].dateOfDischarge = null;
        });
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

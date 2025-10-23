import lodash from 'lodash';
import { IncidentCode } from 'claim/pages/Enum';

export default ({ draftState, changedFields, incidentId }: any) => {
  if (!lodash.has(changedFields, 'claimTypeArray')) return;
  const claimTypeArray = changedFields?.claimTypeArray?.value;
  const ClaimTypeIsPA = lodash.some(claimTypeArray, (item) => item === IncidentCode.PA);
  if (ClaimTypeIsPA) {
    const treatmentListMapArray = draftState.claimEntities.treatmentListMap;
    lodash.map(treatmentListMapArray, (item: any, key) => {
      if (incidentId === item.incidentId) {
        draftState.claimEntities.treatmentListMap[key].treatmentType = IncidentCode.OutPatient;
      }
    });
  }
};

import { produce } from 'immer';
import lodash from 'lodash';
import { IncidentCode } from 'claim/pages/Enum';

const saveIncidentItem = (state: any, action: any) => {
  const { changedFields, incidentId } = action.payload;
  const finalChangedFields = { ...changedFields };

  const nextState = produce(state, (draftState: any) => {
    const fieldsArray = Object.entries(changedFields);
    if (fieldsArray.length === 1) {
      const claimTypeArray = changedFields?.claimTypeArray?.value;
      const ClaimTypeIsPA = lodash.some(claimTypeArray, (item) => item === IncidentCode.PA);
      if (lodash.has(changedFields, 'claimTypeArray') && ClaimTypeIsPA) {
        const treatmentListMapArray = draftState.claimEntities.treatmentListMap;
        lodash.map(treatmentListMapArray, (item: any, key) => {
          if (incidentId === item.incidentId) {
            draftState.claimEntities.treatmentListMap[key].treatmentType = IncidentCode.OutPatient;
          }
        });
      }
    }
    draftState.claimEntities.incidentListMap[incidentId] = {
      ...state.claimEntities.incidentListMap[incidentId],
      ...finalChangedFields,
    };
  });
  return { ...nextState };
};

export default saveIncidentItem;

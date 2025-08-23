import { produce }  from 'immer';
import lodash from 'lodash';
import { CommonYN } from 'claim/enum';
import { formUtils } from 'basic/components/Form';

const saveIncidentItem = (state: any, action: any) => {
  const { changedFields, incidentId } = action.payload;
  const finalChangedFields = { ...changedFields };

  const nextState = produce(state, (draftState: any) => {
    const incidentTemp = { ...draftState.claimEntities.incidentListMap[incidentId] };

    if (lodash.has(changedFields, 'klipClaimNo') && finalChangedFields.length === 1) {
      return;
    }

    delete finalChangedFields.klipClaimNo;

    if (
      formUtils.queryValue(finalChangedFields?.trafficAccidentFlag) !== CommonYN.YES &&
      !lodash.isEmpty(incidentTemp?.reportToThePolice?.errors)
    ) {
      incidentTemp.reportToThePolice = formUtils.queryValue(incidentTemp?.reportToThePolice);
    }

    draftState.claimEntities.incidentListMap[incidentId] = {
      ...incidentTemp,
      ...finalChangedFields,
    };
  });
  return { ...nextState };
};

export default saveIncidentItem;

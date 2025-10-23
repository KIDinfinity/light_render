import lodash from 'lodash';
import { CommonYN } from 'claim/enum';
import { formUtils } from 'basic/components/Form';

export default ({ draftState, changedFields, incidentId }: any) => {
  if (!lodash.has(changedFields, 'trafficAccidentFlag')) return;
  const reportToThePolice = lodash.get(
    draftState,
    `claimEntities.incidentListMap[${incidentId}].reportToThePolice`
  );
  if (
    changedFields?.trafficAccidentFlag?.value !== CommonYN.YES &&
    !lodash.isEmpty(reportToThePolice?.errors)
  ) {
    draftState.claimEntities.incidentListMap[incidentId].reportToThePolice = formUtils.queryValue(
      reportToThePolice
    );
  }
};

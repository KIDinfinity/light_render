import { isArray } from 'lodash';
import filterNotForInsuredPayable from './filterNotForInsuredPayable';
import addTempIncidentDataField from './addTempIncidentDataField';

export default (claimData: any) => {
  const { claimPayableList, incidentList } = claimData;
  if (isArray(claimPayableList) && claimPayableList.length > 0) {
    claimData.claimPayableList = filterNotForInsuredPayable(claimPayableList);
  }
  if (isArray(incidentList) && incidentList.length > 0) {
    claimData.incidentList = addTempIncidentDataField(incidentList);
  }

  return claimData;
};

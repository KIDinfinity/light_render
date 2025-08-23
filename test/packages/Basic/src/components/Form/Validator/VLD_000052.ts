import lodash from 'lodash';
import formUtils from '../formUtils';

// Require at least one primary diagnosis record for each  claim case when claim type is not death.
export const VLD_000052 = (diagnosisList: any, incidentItem: any) => {
  const primaryDiagnosisList = lodash.filter(
    diagnosisList,
    (item: any) => formUtils.queryValue(item.diagnosisType) === 'P'
  );
  const claimTypeArray = formUtils.queryValue(incidentItem?.claimTypeArray);

  return !lodash.includes(claimTypeArray, 'DTH') && lodash.isEmpty(primaryDiagnosisList);
};

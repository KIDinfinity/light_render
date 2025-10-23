import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

const checkCriticalIllness = (incidentItem: any) => {
  if (!incidentItem) return;
  const claimTypeList = formUtils.queryValue(incidentItem.claimTypeArray);
  const isCriticalIllnessRequest = lodash.isArray(claimTypeList) && claimTypeList.includes('CI');
  let hasCriticalIllness = false;
  lodash.map(incidentItem.diagnosisList, (item) => {
    if (item.criticalIllness === 1) {
      hasCriticalIllness = true;
    }
  });

  return isCriticalIllnessRequest ? hasCriticalIllness : true;
};

export const VLD_000051 = (submited: any, incidentItem: any) => (
  rule: any,
  value: any,
  callback: Function
) => {
  if (submited && !checkCriticalIllness(incidentItem) && !value) {
    callback('Require at least one critical diagnosis when claim type contains Critical Illness.');
  }
  callback();
};

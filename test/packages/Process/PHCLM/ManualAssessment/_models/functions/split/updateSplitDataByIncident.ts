import { cloneDeep, isPlainObject } from 'lodash';
import assureClaimPayableFromIncidents from './assureClaimPayableFromIncidents';

export default (postData: any = {}) => {
  if (!isPlainObject(postData)) return postData;
  const { newCase, originalCase } = postData;

  const tempOriginalCase = cloneDeep(originalCase);
  const tempNewCase = cloneDeep(newCase);

  const {
    incidentList: incidentListOriginalCase,
    claimPayableList: claimPayableListOriginalCase,
  } = tempOriginalCase;

  const {
    incidentList: incidentListNewCase,
    claimPayableList: claimPayableListNewCase,
  } = tempNewCase;

  // 确定original case的claimPayableList
  tempOriginalCase.claimPayableList = assureClaimPayableFromIncidents(
    claimPayableListOriginalCase,
    incidentListOriginalCase
  );

  // 确定new case的claimPayableList
  tempNewCase.claimPayableList = assureClaimPayableFromIncidents(
    claimPayableListNewCase,
    incidentListNewCase
  );

  return {
    ...postData,
    newCase: tempNewCase,
    originalCase: tempOriginalCase,
  };
};

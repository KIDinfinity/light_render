import { cloneDeep, isPlainObject } from 'lodash';
import assureIncidentsFromClaimPayable from './assureIncidentsFromClaimPayable';

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

  // 确定original case的ncident list
  tempOriginalCase.incidentList = assureIncidentsFromClaimPayable(
    claimPayableListOriginalCase,
    incidentListOriginalCase
  );

  // 确定new case的incident list
  tempNewCase.incidentList = assureIncidentsFromClaimPayable(
    claimPayableListNewCase,
    incidentListNewCase
  );

  return {
    ...postData,
    newCase: tempNewCase,
    originalCase: tempOriginalCase,
  };
};

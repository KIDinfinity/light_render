import { PolicySetupStatus } from 'claim/pages/Japan/ProcessOfJPCLM/utils/constant';
import { filter, isArray } from 'lodash';

export default (claimPayableList: any[] = []) => {
  if (!isArray(claimPayableList) || claimPayableList.length < 1) return claimPayableList;
  return filter(
    claimPayableList,
    (item: any) => item.policySetupStatus !== PolicySetupStatus.NoBelong
  );
};

import { useMemo } from 'react';
import { useSelector } from 'dva';
import { NAMESPACE } from 'opus/Pages/Process/Claim/NonOpusSupportedClaim/activity.config';
import lodash from 'lodash';

export default function useGetIsCorporatePolicy() {
  const { policyId, policyOwnerList } = useSelector(({ [NAMESPACE]: modelnamepsace }) => ({
    policyId: lodash.get(modelnamepsace, 'businessData.insured.policyId'),
    policyOwnerList: lodash.get(modelnamepsace, 'policyOwnerList', []),
  }));

  return useMemo(() => {
    const currentOwner = lodash.find(policyOwnerList, { policyId });
    const gender = currentOwner?.gender || currentOwner?.ownerClientInfo?.gender;
    const isCorporatePolicy = gender ? (gender === 'C' ? 'Y' : 'N') : 'N';

    return isCorporatePolicy;
  }, [policyId, policyOwnerList]);
}

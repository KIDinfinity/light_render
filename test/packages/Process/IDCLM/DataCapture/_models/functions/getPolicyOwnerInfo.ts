import lodash from 'lodash';

export function getPolicyOwnerInfo(policyId: string, policyOwnerList: any[]) {
  const policyOwner = lodash.find(policyOwnerList, (item: any) => item.policyId === policyId)
    ?.ownerClientInfo;
  if (policyOwner?.id) delete policyOwner.id;
  return policyOwner;
}

export default getPolicyOwnerInfo;

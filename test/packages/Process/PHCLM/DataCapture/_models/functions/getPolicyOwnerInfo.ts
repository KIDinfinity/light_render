import lodash from 'lodash';


export function getPolicyOwnerInfo(clientInfoList: string, policyOwnerList: any[]) {
  const policyOwner= lodash
  .chain(clientInfoList)
  .filter((item) => item.clientId === policyOwnerList[0]?.clientId)
    .value()[0]
  if (policyOwner?.id) delete policyOwner.id;
  return policyOwner;
}

export default getPolicyOwnerInfo;

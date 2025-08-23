import lodash from 'lodash';

export function getClientInfoByPolicyId({ policyOwnerList, clientInfoList, policyId }) {
  const clientId = lodash.find(policyOwnerList, item => item.policyId === policyId)?.clientId;
  const clientInfo = lodash.find(clientInfoList, item => item.clientId === clientId);
  return clientInfo;
}

export default getClientInfoByPolicyId;

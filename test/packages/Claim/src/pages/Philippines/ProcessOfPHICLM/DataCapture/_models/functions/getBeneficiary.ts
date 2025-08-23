import lodash from 'lodash';

export function getBeneficiary({ policyBeneficiaryList, clientInfoList, policyId }: any) {
  const sort = lodash.sortBy(policyBeneficiaryList, ['beneficiaryPercentage', 'clientId'])
  const clientId = lodash.find(sort, item => item.policyId === policyId)?.clientId;
  const clientInfo = lodash.find(clientInfoList, item => item.clientId === clientId);
  return clientInfo;
}

export default getBeneficiary;

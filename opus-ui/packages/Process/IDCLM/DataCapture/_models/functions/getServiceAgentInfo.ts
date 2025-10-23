import lodash from 'lodash';

export const getAgentInfo = (policyId: string, serviceAgentList: any[]) => {
  return lodash
    .chain(serviceAgentList)
    .filter((agent: any) => agent.policyId === policyId)
    .find()
    .value();
};

export const getAgentNoList = (serviceAgentList: any[]) => {
  return lodash.chain(serviceAgentList).map('agentNumber').compact().uniq().value();
};

export default { getAgentInfo, getAgentNoList };

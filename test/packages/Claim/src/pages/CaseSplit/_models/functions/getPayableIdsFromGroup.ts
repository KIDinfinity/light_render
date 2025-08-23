import { isEmpty, values } from 'lodash';
import groupByPolicyNo from './groupByPolicyNo';

export default (payableData: any, policyNo: string) => {
  if (isEmpty(payableData)) return {};
  const groupedByPolicyNo = groupByPolicyNo(payableData);
  return values(groupedByPolicyNo)
    .filter((item: any) => item.policyNo === policyNo)
    .map((item: any) => item.payableId);
};

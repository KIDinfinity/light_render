import { isArray, isString, forEach, differenceWith, isEqual, split } from 'lodash';
import { SplitLevel } from '../JPCLMOfAssessment/_models/dto/SplitLevel';

export const filterPolicyByIncident = (
  listPolicy: any[] = [],
  expectPolicies: any[] = [],
  incidentId: string
) => {
  if (!isArray(listPolicy) || !isArray(expectPolicies) || !isString(incidentId)) return listPolicy;
  const exlcudes: any[] = [];
  forEach(listPolicy, (policy: any) => {
    forEach(expectPolicies, (expect: any) => {
      const { splitLevel } = expect;
      const isClaimLevel = expect.policyId === policy.policyNo;
      switch (splitLevel) {
        case SplitLevel.claim:
          if (isClaimLevel) exlcudes.push(policy);
        case SplitLevel.incident:
          if (isClaimLevel && split(expect.incidentIds, ',').includes(incidentId))
            exlcudes.push(policy);
        default:
          break;
      }
    });
  });

  return differenceWith(listPolicy, exlcudes, isEqual);
};

export default filterPolicyByIncident;

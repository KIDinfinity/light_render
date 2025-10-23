import type { IPolicy } from '@/dtos/claim';
import { groupBy, uniqBy } from 'lodash';

export default (listPolicy: IPolicy[], policyNo: string) => {
  const policyGrouped = groupBy(listPolicy, 'policyNo');
  return uniqBy(policyGrouped[policyNo], 'benefitTypeCode');
};

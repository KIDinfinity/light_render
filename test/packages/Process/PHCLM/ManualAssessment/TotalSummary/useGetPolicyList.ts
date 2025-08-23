import { useMemo } from 'react';
import { useSelector } from 'dva';
import lodash from 'lodash';

import { formUtils } from 'basic/components/Form';
import getPolicyYearValue from '../_models/functions/getPolicyYearValue';
import { NAMESPACE } from '../activity.config';

interface IpolicyList {
  policyNo: string;
  policyYear: string;
  policyCurrency: string;
  viewOrder: string;
  children: string[];
}

const groupByRule = [
  {
    key: 'policyNo',
  },
  {
    key: 'policyYear',
    get: (item: any) => getPolicyYearValue(item),
  },
];

const groupByEngine = (item: any) =>
  lodash
    .chain(groupByRule)
    .map((rule) => (lodash.isFunction(rule?.get) ? rule.get(item) : lodash.get(item, rule.key)))
    .join('')
    .trim()
    .value();

export default ({ incidentId }: any) => {
  const claimPayableListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.claimEntities?.claimPayableListMap
  );

  return useMemo(() => {
    const tempMap: any = formUtils.cleanValidateData(claimPayableListMap);

    return lodash
      .chain(tempMap)
      .filter((item: any) => item?.incidentId === incidentId)
      .groupBy((item: any) => groupByEngine(item))
      .omit([undefined, null, ''])
      .map((item: any, key: string) => ({
        policyNo: item?.[0]?.policyNo,
        policyYear: getPolicyYearValue(item?.[0]),
        policyCurrency: item?.[0]?.policyCurrency,
        viewOrder: lodash.minBy(item, 'viewOrder')?.viewOrder,
        payableIds: lodash.map(item, (self: any) => self?.id),
        key,
      }))
      .orderBy('viewOrder')
      .value();
  }, [claimPayableListMap]);
};

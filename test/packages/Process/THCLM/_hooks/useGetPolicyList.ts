import { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';
export default ({ NAMESPACE }: any) => {
  const insuredList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.insuredList
  );

  return useMemo(() => {
    return lodash
      .chain(insuredList)
      .reduce((arr: any, insuredItem: any) => {
        return [
          ...arr,
          ...lodash.map(insuredItem.policyIdList, (policyId: any) => {
            const policyResult = lodash.find(insuredItem.policyResultList, { policyId }) || {};
            return {
              policyId,
              ...insuredItem,
              riskStatus: policyResult.riskStatus,
              policyResult,
              policyIdList: [],
            };
          }),
        ];
      }, [])
      .value();
  }, [insuredList]);
};

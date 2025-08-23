import { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { getClaimPayableList } from 'claim/pages/utils/selector';

export default ({ NAMESPACE, incidentId }: any) => {
  const claimPayableListMap =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.claimEntities?.claimPayableListMap
    ) || {};
  const claimPayableList =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.claimProcessData?.claimPayableList
    ) || [];
  const payableList = getClaimPayableList(incidentId, claimPayableListMap, claimPayableList);

  return useMemo(() => {
    return (
      lodash
        .chain(payableList || [])
        .reduce((isHBCancer: boolean, { productCode, claimDecision }: any) => {
          return lodash.includes(['OHBE', 'OHBF', 'OHBG', 'OHBH'], productCode) &&
            claimDecision === 'A'
            ? true
            : isHBCancer;
        }, false)
        .value() || false
    );
  }, [payableList]);
};

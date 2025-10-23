import { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { NAMESPACE } from '../activity.config';

export default ({ incidentId }) => {
  const adjustmentFactorListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.adjustmentFactorListMap
  );
  const claimPayableListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimEntities?.claimPayableListMap
  );
  return useMemo(() => {
    const payableProductList = lodash
      .chain(claimPayableListMap)
      .filter((item) => item.incidentId === incidentId)
      .map((item) => item.productCode)
      .compact()
      .uniq()
      .value();
    return lodash.filter(
      adjustmentFactorListMap,
      (item: any) =>
        item?.incidentId === incidentId && lodash.includes(payableProductList, item?.productCode)
    );
  }, [claimPayableListMap, incidentId, adjustmentFactorListMap]);
};

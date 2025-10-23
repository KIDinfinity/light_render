import React, { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { NAMESPACE } from '../activity.config';
import ProductItem from './ProductItem';

import styles from './index.less';

export default ({ incidentId }: any) => {
  const adjustmentFactorListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.adjustmentFactorListMap
  );
  const claimPayableListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimEntities?.claimPayableListMap
  );

  const payableProductList = useMemo(
    () =>
      lodash
        .chain(claimPayableListMap)
        .filter((item) => item.incidentId === incidentId)
        .map((item) => item.productCode)
        .compact()
        .uniq()
        .value(),
    [claimPayableListMap, incidentId]
  );

  const productList = lodash.filter(
    adjustmentFactorListMap,
    (item: any) =>
      item?.incidentId === incidentId && lodash.includes(payableProductList, item?.productCode)
  );
  return (
    <div className={styles.productList}>
      {lodash.map(
        productList,
        (item, index) =>
          lodash.size(item?.factorList) > 0 && (
            <ProductItem
              key={`${item.policyNo}${item.productCode}`}
              index={index}
              productItem={item}
            />
          )
      )}
    </div>
  );
};

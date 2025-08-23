import { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';

export default () => {
  const planProductConfig = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.planProductConfig,
    shallowEqual
  );
  return useMemo(() => {
    const productCodeSet = new Set();

    const products = lodash.concat(
      lodash.get(planProductConfig, 'basicPlanProductFeatureList', []),
      lodash.get(planProductConfig, 'otherPlanProductFeatureList', [])
    );
    lodash
      .chain(products)
      .forEach((product: any) => {
        productCodeSet.add(product);
        lodash
          .chain(product)
          .get('relatedRider', [])
          .forEach((rider: any) => {
            productCodeSet.add(rider);
          })
          .value();
      })
      .value();
    return Array.from(productCodeSet);
  }, [planProductConfig]);
};

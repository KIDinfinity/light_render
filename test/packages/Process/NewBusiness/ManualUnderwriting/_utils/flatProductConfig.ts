import lodash from 'lodash';
import type { planProductConfig, riderConfig, coverageConfig } from '../types';

export default ({ planProductConfig }: { planProductConfig: planProductConfig }) => {
  const productCodeSet: Set<coverageConfig | riderConfig> = new Set();

  const products = lodash.concat(
    lodash.get(planProductConfig, 'basicPlanProductFeatureList', []),
    lodash.get(planProductConfig, 'otherPlanProductFeatureList', [])
  );
  lodash
    .chain(products)
    .forEach((product) => {
      productCodeSet.add(product);
      lodash
        .chain(product)
        .get('relatedRider', [])
        .forEach(rider => {
          productCodeSet.add(rider);
        })
        .value();
    })
    .value();
  return Array.from(productCodeSet);
};

import lodash from 'lodash';
import type { planProductConfig, riderConfig } from '../types';

export default ({ productCodes, planProductConfig }: { productCodes: string[], planProductConfig: planProductConfig}) => {
  const productCollect: Set<riderConfig> = new Set();
  const basicPlanProductFeatureList = lodash.get(
    planProductConfig,
    'basicPlanProductFeatureList',
    []
  );
  const otherPlanProductFeatureList = lodash.get(
    planProductConfig,
    'otherPlanProductFeatureList',
    []
  );

  lodash
    .chain([...basicPlanProductFeatureList, ...otherPlanProductFeatureList])
    .filter((configItem) => {
      return lodash.includes(productCodes, configItem?.productCode);
    })
    .forEach((configItem) => {
      lodash
        .chain(configItem)
        .get('relatedRider', [])
        .forEach((riderItem) => {
          if (
            lodash.every(Array.from(productCollect), (productItem) => {
              return productItem.productCode !== riderItem.productCode;
            })
          ) {
            productCollect.add(riderItem);
          }
        })
        .value();
    })
    .value();
  return Array.from(productCollect);
};

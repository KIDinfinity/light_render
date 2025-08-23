import lodash from 'lodash';

export default ({ productCodes, planProductConfig }: any) => {
  const productCollect = new Set();
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
    .filter((configItem: any) => {
      return lodash.includes(productCodes, configItem?.productCode);
    })
    .forEach((configItem: any) => {
      lodash
        .chain(configItem)
        .get('relatedRider', [])
        .forEach((riderItem: any) => {
          if (
            lodash.every(Array.from(productCollect), (productItem: any) => {
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

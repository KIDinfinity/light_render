import lodash from 'lodash';

export default ({ planProductConfig }: any) => {
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
};

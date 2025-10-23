import { produce } from 'immer';
import lodash from 'lodash';

import { formUtils } from 'basic/components/Form';

const getRelatedRider = ({ productCodes, planProductConfig }: any) => {
  const { basicPlanProductFeatureList, otherPlanProductFeatureList } = planProductConfig;
  return lodash
    .chain([...basicPlanProductFeatureList, ...otherPlanProductFeatureList])
    .filter((configItem: any) => {
      return lodash.includes(productCodes, configItem?.productCode);
    })
    .map((configItem: any) => {
      return lodash
        .get(configItem, 'relatedRider', [])
        ?.map((riderItem: any) => riderItem.productCode);
    })
    .flatten()
    .uniq()
    .value();
};

export default (state: any, action: any) => {
  const { coreCode, id: coverageId } = lodash.pick(action.payload, ['coreCode', 'id']);
  const coverageList = lodash.get(state, 'modalData.processData.coverageList');
  const planProductConfig = lodash.get(state, 'planProductConfig');

  const productCodes = lodash.map(coverageList, (coverageItem: any) => {
    if (coverageItem.id === coverageId) {
      return coreCode;
    }
    return formUtils.queryValue(coverageItem.coreCode);
  });
  const relatedRider = getRelatedRider({ productCodes, planProductConfig });

  const allPlanProductList = lodash
    .map(planProductConfig.basicPlanProductFeatureList, (item) => item.productCode)
    .concat(lodash.map(planProductConfig.otherPlanProductFeatureList, (item) => item.productCode));
  const removeRiderCoreCode = lodash.concat(relatedRider, allPlanProductList);

  const removeCoverageId = lodash
    .filter(
      coverageList,
      (coverage) =>
        formUtils.queryValue(coverage.coreCode) &&
        !lodash.includes(removeRiderCoreCode, formUtils.queryValue(coverage.coreCode)) &&
        coverage.isMain === 'N'
    )
    .map((coverage) => coverage.id);

  const nextState = produce(state, (draftState: any) => {
    lodash.set(
      draftState,
      'modalData.processData.coverageList',
      lodash.filter(coverageList, (coverage) => !lodash.includes(removeCoverageId, coverage.id))
    );
  });

  return { ...nextState };
};

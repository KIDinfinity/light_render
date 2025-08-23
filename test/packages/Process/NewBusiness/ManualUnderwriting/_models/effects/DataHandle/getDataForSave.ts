import lodash from 'lodash';
import CaseCategory from 'enum/CaseCategory';
import ProductType from 'process/NewBusiness/ManualUnderwriting/_enum/ProductType';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

const packFundChartDataUrl = (BEDatas: any, fundChartDataUrl: string) => {
  const coverageList = lodash.get(BEDatas, 'policyList.0.coverageList');
  const mainCoverageProductType = lodash.find(coverageList, { isMain: 'Y' })?.productType;
  const coverageIndex = lodash.findIndex(BEDatas.policyList[0].coverageList, (covergeItem) => {
    const productType = covergeItem.productType;
    return (
      productType === ProductType.ILP ||
      productType === ProductType.RT ||
      productType === ProductType.AT
    );
  });
  const caseCategory = lodash.get(BEDatas, 'caseCategory');
  const map = [CaseCategory.BP_NB_CTG005, CaseCategory.BP_NB_CTG003];
  if (lodash.includes(map, caseCategory) && mainCoverageProductType === ProductType.ILP) {
    return { index: coverageIndex, fundChartDataUrl: '' };
  }
  const targetProductType = [ProductType.ILP, ProductType.RT, ProductType.AT];
  const isMatchTargeProduct = lodash
    .chain(coverageList)
    .some((coverageItem) => {
      return lodash.includes(targetProductType, coverageItem?.productType);
    })
    .value();
  return { index: coverageIndex, fundChartDataUrl: isMatchTargeProduct ? fundChartDataUrl : '' };
};

export { packFundChartDataUrl };
/**
 * TODO:去掉一些不必要的默认逻辑(可看原本NB的getDataForSave文件)
 * reason ->policyList.coverageList.coverageLoadingList.reason
 * countryCode ->policyList.clientInfoList.contactInfoList.countryCode
 */

export default function* (_, { select, put }: any): Generator<any, any, any> {
  const processData = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData
  ) || {};
  const entities = yield select(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.entities);
  const fundChartDataUrl = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.fundChartDataUrl
  );

  const BEDatas: any = yield put.resolve({
    type: 'getFEToBE',
    payload: {
      processData,
      entities,
    },
  });

  const mainCoverageFundChartDataUrl = packFundChartDataUrl(BEDatas, fundChartDataUrl);
  if (mainCoverageFundChartDataUrl.index !== -1) {
    lodash.set(
      BEDatas,
      `policyList.0.coverageList.[${mainCoverageFundChartDataUrl.index}].fundChartDataUrl`,
      mainCoverageFundChartDataUrl.fundChartDataUrl
    );
  }

  return BEDatas;
}

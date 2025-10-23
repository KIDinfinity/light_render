import lodash from 'lodash';
import CaseCategory from 'enum/CaseCategory';
import ProductType from 'opus/NewBusiness/ManualUnderwriting/_enum/ProductType';

import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';

const packFundChartDataUrl = (BEDatas: any, fundChartDataUrl: string) => {
  const mainCoverageProductType = lodash.get(BEDatas, 'policyList.0.coverageList', {
    isMain: 'Y',
  })?.productType;
  const mainCoverageIndex = lodash.findIndex(BEDatas.policyList[0].coverageList, { isMain: 'Y' });
  const caseCategory = lodash.get(BEDatas, 'caseCategory');
  const map = [CaseCategory.BP_NB_CTG005, CaseCategory.BP_NB_CTG003];
  if (lodash.includes(map, caseCategory) && mainCoverageProductType === ProductType.ILP) {
    return { index: mainCoverageIndex, fundChartDataUrl: '' };
  }
  return { index: mainCoverageIndex, fundChartDataUrl };
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

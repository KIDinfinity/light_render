import lodash from 'lodash';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import { formUtils } from 'basic/components/Form';

const map = { RT: 'epaAllocation', AT: 'adHocTopUpAllocation' };

export default function* ({ payload }: any, { select, put }: any): Generator<any, void, any> {
  const { productCodeList, coreCode, productCodeListByCoreCode } = payload;

  const portfolioType = yield select(
    (state: any) =>
      state?.manualUnderwriting?.businessData?.policyList?.[0]?.fundInfo?.portfolioType
  );
  const planDictProductRegion = yield select(
    (state: any) => state?.manualUnderwriting?.planDictProductRegion
  );
  const totalFundInfoList = yield select(
    (state: any) =>
      state?.manualUnderwriting?.businessData?.policyList?.[0]?.fundInfo?.totalFundInfoList
  );
  const fundCodeList = lodash.map(totalFundInfoList, (item) => item.fundCode);
  const config = lodash
    .chain(productCodeList)
    .filter((item) => lodash.includes(fundCodeList, item.fundCode))
    .map((item) => {
      return lodash.find(item.cfgPlanFundBOS, {
        portfolioType: formUtils.queryValue(portfolioType),
        productCode: coreCode,
      });
    })
    .value();
  const productType = lodash.find(planDictProductRegion, { productCode: coreCode })?.productType;
  const productTypeList = lodash.map(productCodeListByCoreCode, (item) => {
    return lodash.find(planDictProductRegion, { productCode: item })?.productType;
  });
  const fundList = lodash.map(totalFundInfoList, (item) => {
    const configItem = lodash.find(config, { fundCode: item.fundCode });
    const etra = {};
    if (lodash.every(productTypeList, (ev) => ev !== 'RT')) {
      etra[map.RT] = null;
    }
    if (lodash.every(productTypeList, (ev) => ev !== 'AT')) {
      etra[map.AT] = null;
    }
    if (
      !lodash.isEmpty(configItem) &&
      configItem?.maxAllocationPercentage === configItem?.minAllocationPercentage
    ) {
      etra[map?.[productType]] = item?.fundAllocation;
    }
    return {
      ...item,
      ...etra,
    };
  });

  yield put({ type: `${NAMESPACE}/addAutoAttachFunds`, payload: { fundList } });
}

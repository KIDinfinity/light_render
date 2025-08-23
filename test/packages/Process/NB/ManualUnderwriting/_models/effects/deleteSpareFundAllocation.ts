import lodash from 'lodash';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import { formUtils } from 'basic/components/Form';

const map = { RT: 'epaAllocation', AT: 'adHocTopUpAllocation' };

export default function* ({ payload }: any, { select, put }: any): Generator<any, void, any> {
  const { id } = payload;
  if (!id) {
    return;
  }
  const coverageList = yield select(
    (state: any) => state?.manualUnderwriting?.businessData?.policyList?.[0]?.coverageList
  );
  const productCodeListByCoreCode = lodash
    .chain(coverageList)
    .filter((item) => item.id !== id)
    .map((item: any) => formUtils.queryValue(item.coreCode))
    .compact()
    .value();
  const planDictProductRegion = yield select(
    (state: any) => state?.manualUnderwriting?.planDictProductRegion
  );
  const productTypeList = lodash.map(productCodeListByCoreCode, (item) => {
    return lodash.find(planDictProductRegion, { productCode: item })?.productType;
  });
  const totalFundInfoList = yield select(
    (state: any) =>
      state?.manualUnderwriting?.businessData?.policyList?.[0]?.fundInfo?.totalFundInfoList
  );
  const fundList = lodash.map(totalFundInfoList, (item) => {
    const etra = {};
    if (lodash.every(productTypeList, (ev) => ev !== 'RT')) {
      etra[map.RT] = null;
    }
    if (lodash.every(productTypeList, (ev) => ev !== 'AT')) {
      etra[map.AT] = null;
    }
    return {
      ...item,
      ...etra,
    };
  });

  yield put({ type: `${NAMESPACE}/addAutoAttachFunds`, payload: { fundList } });
}

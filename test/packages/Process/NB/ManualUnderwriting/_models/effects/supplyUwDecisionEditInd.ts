import lodash from 'lodash';
import { updateUWDecision } from '@/services/owbNbCoverageUWDecisionServices';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';

export default function* (_: any, { call, put, select }: any) {
  const coverageList = yield select(
    (state: any) => state.manualUnderwriting?.businessData?.policyList?.[0].coverageList
  );
  const loadingMappingRule = yield select(
    (state: any) => state.manualUnderwriting?.loadingMappingRule
  );
  const basicProductList = lodash
    .chain(coverageList)
    .find((item) => item.isMain === 'Y')
    .value();
  const { productCode, coverageLoadingList, loadingRule } = lodash.pick(basicProductList, [
    'productCode',
    'coverageLoadingList',
    'loadingRule',
  ]);
  const targetRiderCodeArray = lodash
    .chain(loadingMappingRule)
    .filter((item: any) => {
      return item?.productCode === productCode;
    })
    .map((item: any) => item?.targetRiderCode)
    .value();
  const newCoverageList = (() => {
    return lodash
      .chain(coverageList)
      .map((coverageItem) => {
        if (
          coverageItem.productCode !== productCode &&
          lodash.includes(targetRiderCodeArray, coverageItem.productCode)
        ) {
          return {
            ...coverageItem,
            coverageLoadingList: lodash.map(coverageLoadingList, (item: any) => {
              return {
                ...item,
                coverageId: coverageItem?.id,
              };
            }),
            loadingRule: {
              ...coverageItem?.loadingRule,
              feAllowIndicator: loadingRule?.feAllowIndicator,
              meAllowIndicator: loadingRule?.meAllowIndicator,
              rateAllowIndicator: loadingRule?.rateAllowIndicator,
            },
          };
        }
        return coverageItem;
      })
      .value();
  })();

  const response = yield call(updateUWDecision, { coverageList: newCoverageList });

  if (lodash.isPlainObject(response) && response.success && !lodash.isEmpty(response.resultData)) {
    yield put({
      type: `${NAMESPACE}/updateCoverageListWhenHitSustainabilityChecking`,
      payload: {
        coverageList: response.resultData.coverageList,
      },
    });
  }
}

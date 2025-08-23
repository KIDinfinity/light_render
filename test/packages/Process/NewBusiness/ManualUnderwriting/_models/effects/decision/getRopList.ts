import lodash from 'lodash';
import { getRopList } from '@/services/miscSectionConfigControllerService';
import { tenant } from '@/components/Tenant';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

export default function* (_: any, { call, put, select }: any) {
  const planProductConfig = yield select((state: any) => state[NAMESPACE]?.planProductConfig);
  const {
    basicPlanProductFeatureList = [],
    otherPlanProductFeatureList = [],
    requiredProductCodeList = [],
  } = lodash.pick(planProductConfig, [
    'basicPlanProductFeatureList',
    'otherPlanProductFeatureList',
    'requiredProductCodeList',
  ]);
  const productCode = lodash
    .filter(
      [...basicPlanProductFeatureList, ...otherPlanProductFeatureList, ...requiredProductCodeList],
      (item) => item.ropInd === 'Y'
    )
    .map((item) => item.productCode);

  if (lodash.isEmpty(productCode)) {
    return;
  }

  const params = {
    regionCode: tenant.region(),
    typeCode: 'Dropdown_POL_ROP',
    productCode: productCode,
    language: tenant.getLocaleLang(),
  };
  const response = yield call(getRopList, params);

  if (lodash.isPlainObject(response) && response.success && !lodash.isEmpty(response.resultData)) {
    const ropListMap = lodash.get(response, 'resultData') || {};
    yield put({
      type: 'saveRopListMap',
      payload: {
        ropListMap: ropListMap,
      },
    });
  }
}

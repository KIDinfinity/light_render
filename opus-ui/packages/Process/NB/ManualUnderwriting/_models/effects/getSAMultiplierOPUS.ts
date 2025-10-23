import lodash from 'lodash';
import { getRopList } from '@/services/miscSectionConfigControllerService';
import { tenant } from '@/components/Tenant';

export default function* (_: any, { call, put, select }: any) {
  const planProductConfig = yield select(
    (state: any) => state.manualUnderwriting?.planProductConfig
    );
  const {
    basicPlanProductFeatureList = [],
    otherPlanProductFeatureList = [],
    requiredProductCodeList = [],
  } = lodash.pick(planProductConfig, [
    'basicPlanProductFeatureList',
    'otherPlanProductFeatureList',
    'requiredProductCodeList',
  ]);
  const productCodeList = lodash
    .chain([
      ...basicPlanProductFeatureList,
      ...otherPlanProductFeatureList,
      ...requiredProductCodeList,
    ])
    .map((item) => item.productCode)
    .compact()
    .value();

  if (lodash.isEmpty(productCodeList)) {
    return;
  }

  const params = {
    regionCode: tenant.region(),
    typeCode: 'Dropdown_POL_SAMultiplier',
    productCodeList: productCodeList,
    language: tenant.getLocaleLang(),
    sourceSystem: 'OPUS',
  };
  const response = yield call(getRopList, params);
  if (lodash.isPlainObject(response) && response.success && !lodash.isEmpty(response.resultData)) {
    yield put({
      type: 'saveSAMultiplierOPUS',
      payload: {
        SAMultiplierOPUSListMap: lodash.get(response, 'resultData') || {},
      },
    });
  }
}

import lodash from 'lodash';
import { getRopList } from '@/services/miscSectionConfigControllerService';
import { tenant } from '@/components/Tenant';

interface IParams {
  payload?: {
    productCodeList?: string[];
  };
}

export default function* ({ payload }: IParams, { call, put, select }: any) {
  const localProductCodeList = payload?.productCodeList;
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
  const productCodeList =
    localProductCodeList ||
    lodash
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
    typeCode: 'Dropdown_POL_PlanOption',
    productCodeList: productCodeList,
    language: tenant.getLocaleLang(),
  };
  const response = yield call(getRopList, params);
  if (lodash.isPlainObject(response) && response.success && !lodash.isEmpty(response.resultData)) {
    yield put({
      type: 'saveRopPlanOptionListMap',
      payload: {
        ropPlanOptionListMap: lodash.get(response, 'resultData') || {},
      },
    });
  }
}

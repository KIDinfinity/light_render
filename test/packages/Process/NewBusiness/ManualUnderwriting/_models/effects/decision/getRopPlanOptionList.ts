import lodash from 'lodash';
import flatProductConfig from 'process/NewBusiness/ManualUnderwriting/_utils/flatProductConfig';
import { getRopList } from '@/services/miscSectionConfigControllerService';
import { tenant } from '@/components/Tenant';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import { planProductConfig } from 'process/NewBusiness/ManualUnderwriting/types';

export default function* ({}, { call, put, select }: any) {
  const planProductConfig:planProductConfig = yield select((state: any) => state[NAMESPACE]?.planProductConfig);

  const productCodeList = flatProductConfig({ planProductConfig }).map(item => item.productCode);

  if (lodash.isEmpty(productCodeList)) {
    return;
  }

  const params = {
    regionCode: tenant.region(),
    typeCode: 'Dropdown_POL_PlanOption',
    productCodeList,
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

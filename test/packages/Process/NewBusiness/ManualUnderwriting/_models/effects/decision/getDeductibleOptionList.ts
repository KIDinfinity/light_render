import lodash from 'lodash';
import { getDeductibleOptionsByProductCodeAndBenefitPlan } from '@/services/owbNbCfgControllerService';
import { formUtils } from 'basic/components/Form';

export default function* ({ payload }: any, { call, put }: any) {
  const { coverageList } = payload;
  if (lodash.isArray(coverageList) && coverageList.length > 0) {
    const params = coverageList.map((item) => {
      return {
        productCode: formUtils.queryValue(item.coreCode),
        benefitPlan: formUtils.queryValue(item.hospitalPlanCode),
      };
    });
    const response = yield call(getDeductibleOptionsByProductCodeAndBenefitPlan, params);
    const { success, resultData } = lodash.pick(response, ['success', 'resultData']);
    if (success) {
      yield put({
        type: 'setDeductibleOptionList',
        payload: {
          deductibleOptionList: resultData,
        },
      });
    }
  }
}

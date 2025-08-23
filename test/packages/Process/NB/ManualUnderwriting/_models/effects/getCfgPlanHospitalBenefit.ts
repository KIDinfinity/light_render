import lodash from 'lodash';
import { getCfgPlanHospitalBenefit } from '@/services/owbNbCfgControllerService';

export default function* (params: any, { call, put }: any) {
  const response = yield call(getCfgPlanHospitalBenefit);
  if (response?.success) {
    yield put({
      type: 'saveCfgPlanHospitalBenefit',
      payload: {
        cfgPlanHospitalBenefits: lodash.get(response, 'resultData'),
      },
    });
    return true;
  }

  return false;
}

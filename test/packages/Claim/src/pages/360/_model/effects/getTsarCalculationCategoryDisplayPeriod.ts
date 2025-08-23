import lodash from 'lodash';
import owbNbCfgControllerService from '@/services/owbNbCfgControllerService';

export default function* getTsarCalculationCategoryDisplayPeriod(_: any, { call, put }: any) {
  const response = yield call(owbNbCfgControllerService.getTsarCalculationCategoryDisplayPeriod);

  if (response?.success && lodash.isArray(response?.resultData)) {
    yield put({
      type: 'saveTsarCalculationCategoryDisplayPeriod',
      payload: {
        tsarCalculationCategoryDisplayPeriod: response?.resultData,
      },
    });
  }
}

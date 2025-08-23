import lodash from 'lodash';
import { getCfgFactoringHouses } from '@/services/owbNbCfgControllerService';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

export default function* (_: any, { select, call, put }: any) {
  const factoringHousesList = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.factoringHousesList
  );

  if (lodash.isEmpty(factoringHousesList)) {
    const response = yield call(getCfgFactoringHouses);
    if (
      lodash.isPlainObject(response) &&
      !!response?.success &&
      lodash.isArray(response?.resultData) &&
      !lodash.isEmpty(response?.resultData)
    ) {
      yield put({
        type: 'saveFactoringHousesList',
        payload: {
          factoringHousesList: response.resultData,
        },
      });
    }
  }
}

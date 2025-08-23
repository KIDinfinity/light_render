import lodash from 'lodash';
import { list } from '@/services/owbNbDropdownControllerService';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

export default function* (_, { call, put, select }: any) {
  const applicationNo = yield select((state: any) => state[NAMESPACE].processData?.planInfoData?.applicationNo);
  const response = yield call(list, {
    applicationNo,
    dropDownType: 'dropdownOfClientInfo',
  });
  if (lodash.isPlainObject(response) && response.success && response.resultData) {
    yield put({
      type: 'saveClientNameDicts',
      payload: {
        clientNameDicts: response.resultData,
      },
    });
  }
}

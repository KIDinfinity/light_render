import lodash from 'lodash';
import { list } from '@/services/owbNbDropdownControllerService';

export default function* (_, { call, put, select }: any) {
  const { applicationNo } = yield select((state: any) => state.manualUnderwriting.businessData);
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

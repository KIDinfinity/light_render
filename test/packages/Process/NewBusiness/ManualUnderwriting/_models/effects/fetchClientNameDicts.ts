import lodash from 'lodash';
import { list } from '@/services/owbNbDropdownControllerService';

export default function* (
  { payload: { applicationNo } }: { payload: { applicationNo: any } },
  { call, put }: any
) {
  // @ts-ignore
  const response = yield call(list, {
    applicationNo,
    dropDownType: 'dropdownOfClientInfo',
  });
  if (lodash.isPlainObject(response) && response.success && response.resultData) {
    yield put({
      type: 'setClientNameDicts',
      payload: {
        clientNameDicts: response.resultData,
      },
    });
  }
}

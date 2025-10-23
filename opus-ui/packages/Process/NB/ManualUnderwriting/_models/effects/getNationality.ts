import lodash from 'lodash';
import { searchByRegionCode } from '@/services/miscNationalityInformationControllerService';

export default function* (_: any, { call, put }: any) {
  const response = yield call(searchByRegionCode, {});
  if (lodash.isPlainObject(response) && response.success && !lodash.isEmpty(response.resultData)) {
    const nationality = lodash.get(response, 'resultData');
    yield put({
      type: 'saveNationality',
      payload: {
        nationality,
      },
    });
  }
  return response;
}

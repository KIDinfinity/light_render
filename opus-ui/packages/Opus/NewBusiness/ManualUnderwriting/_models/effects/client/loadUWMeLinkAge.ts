import lodash from 'lodash';
import { serialize as objectToFormData } from 'object-to-formdata';
import { getSystemConfig } from '@/services/integrationSystemConfigControllerService';

export default function* (_: any, { call, put }: any) {
  const response = yield call(getSystemConfig, objectToFormData({ systemCode: 'UWMe' }));
  if (
    lodash.isPlainObject(response) &&
    response.success &&
    lodash.isPlainObject(response.resultData)
  ) {
    yield put({
      type: 'saveUWMeLinkAge',
      payload: {
        UWMeLinkAge: lodash.get(response, 'resultData.host'),
      },
    });
  }
}

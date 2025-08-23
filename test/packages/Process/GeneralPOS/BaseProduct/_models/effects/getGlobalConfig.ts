import lodash from 'lodash';
import { tenant } from '@/components/Tenant';
import { getGlobalConfig } from '@/services/miscGlobalConfigControllerService';

export default function* ({ payload }: any, { call, put }: any) {
  const { codeType } = payload || {};
  const response = yield call(getGlobalConfig, {
    codeType,
    region: tenant.region(),
  });

  if (
    lodash.isPlainObject(response) &&
    !!response.success &&
    lodash.isArray(response.resultData) &&
    response.resultData.length > 0
  ) {
    yield put({
      type: 'saveGlobalConfig',
      payload: {
        [codeType]: lodash
          .chain(response.resultData)
          .reduce((arr: any, { defaultValue }: any) => {
            return [...arr, ...defaultValue.split(',')];
          }, [])
          .value(),
      },
    });
  }
}

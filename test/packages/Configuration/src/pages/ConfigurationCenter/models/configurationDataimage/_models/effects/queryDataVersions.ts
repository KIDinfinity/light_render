import lodash from 'lodash';
import type { SagaProps, PayProps } from 'configuration/pages/ConfigurationCenter/Utils/Typings';
import { queryDataVersions } from '@/services/ccBusinessDataControllerService';
import { getDataVersionTree } from 'configuration/pages/ConfigurationCenter/Utils/DataVersion';

export default function* ({ payload }: PayProps, { call, put, select }: SagaProps) {
  const { functionId, record } = payload;
  yield put({
    type: 'save',
    payload: {
      currentRecord: record,
    },
  });

  const response = yield call(queryDataVersions, {
    functionId,
    record,
  });

  if (response && response.success) {
    const { dataVersion } = yield select((state: any) => state.configurationDataImage);
    const version = getDataVersionTree(response.resultData || []);
    const target = dataVersion.find((el: any) => lodash.isEqual(el.record, record));
    if (!target) {
      dataVersion.push({
        record,
        version,
      });
    } else {
      target.version = version;
    }
    yield put({
      type: 'save',
      payload: {
        dataVersion,
        record,
      },
    });
  }
  return response;
}

import lodash from 'lodash';
import type { SagaProps, PayProps } from 'configuration/pages/ConfigurationCenter/Utils/Typings';
import { getDataVersionTree } from 'configuration/pages/ConfigurationCenter/Utils/DataVersion';

export default function* ({ payload }: PayProps, { put, select }: SagaProps) {
  const { versionData = [] } = payload;
  const { dataVersion, currentRecord: record } = yield select(
    (state: any) => state.configurationDataImage
  );
  if (record) {
    const version = getDataVersionTree(versionData);
    const newDataVersion = lodash.cloneDeep(dataVersion);
    const target = newDataVersion.find((el: any) => lodash.isEqual(el.record, record));
    if (!target) {
      newDataVersion.push({
        record,
        version,
      });
    } else {
      target.version = version;
    }
    yield put({
      type: 'save',
      payload: {
        dataVersion: newDataVersion,
      },
    });
  }
}

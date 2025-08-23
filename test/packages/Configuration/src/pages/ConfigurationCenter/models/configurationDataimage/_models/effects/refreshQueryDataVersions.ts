import lodash from 'lodash';
import type { SagaProps, PayProps } from 'configuration/pages/ConfigurationCenter/Utils/Typings';


export default function* ({ payload }: PayProps, { put, select }: SagaProps) {
  const {
    currentRecord: record,
    currentMenu: { id: functionId },
  } = yield select((state: any) => ({
    ...state.configurationDataImage,
    ...state.configurationMenu,
  }));

  if (!lodash.isEmpty(record)) {
    yield put({
      type: 'queryDataVersions',
      payload: {
        functionId,
        record,
        ...payload,
      },
    });
  }
}

import type { SagaProps, PayProps } from 'configuration/pages/ConfigurationCenter/Utils/Typings';
import {
  getSearchDefault,
} from 'configuration/pages/ConfigurationCenter/Utils/Search';


export default function* ({ payload }: PayProps, { put, select }: SagaProps) {
  const { dataImageFunction } = yield select((state: any) => state.configurationDataImage);
  yield put({
    type: 'saveReset',
    payload: {
      resultData: {},
      searchDefault: {},
      functionData: {},
      ...payload,
    },
  });
  yield put({
    type: 'configurationTabs/save',
    payload: {
      isTabSearch: true,
    },
  });
  yield put({
    type: 'configurationDataImage/reset',
    payload: {
      searchDefault: getSearchDefault(dataImageFunction),
      dataVersion: [],
    },
  });
}

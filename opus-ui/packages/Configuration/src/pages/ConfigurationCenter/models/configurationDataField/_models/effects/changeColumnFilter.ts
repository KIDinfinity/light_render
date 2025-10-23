import lodash from 'lodash';
import type {
  PayProps,
  SagaProps,
} from 'configuration/pages/ConfigurationCenter/Utils/Typings';

export default function* ({ payload }: PayProps, { put, select }: SagaProps) {
  const { checked, name, functionCode } = payload;
  const { filterMap } = yield select((state: any) => state.configurationDataField);
  const currentFilter = lodash.get(filterMap, functionCode) || {};
  lodash.set(currentFilter, name, checked);
  lodash.set(filterMap, functionCode, currentFilter);
  yield put({
    type: 'save',
    payload: {
      filterMap: {
        ...filterMap,
      },
    },
  });
}

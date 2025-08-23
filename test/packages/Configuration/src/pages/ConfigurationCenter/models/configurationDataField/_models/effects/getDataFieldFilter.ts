import lodash from 'lodash';
import type {
  PayProps,
  SagaProps,
  DataFieldProps,
} from 'configuration/pages/ConfigurationCenter/Utils/Typings';

export default function* ({ payload }: PayProps, { put, select }: SagaProps) {
  const { functionCode, dataFieldList } = payload;
  const { filterMap } = yield select((state: any) => state.configurationDataField);
  const currentFilter = lodash.get(filterMap, functionCode) || {};
  const newFilter = dataFieldList.reduce((fMap: any, item: DataFieldProps) => {
    const { visible, fieldName } = item;
    if (visible) {
      const checked = lodash.get(currentFilter, fieldName);
      lodash.set(fMap, fieldName, checked === undefined ? true : checked);
    }
    return fMap;
  }, {});

  lodash.set(filterMap, functionCode, newFilter);
  yield put({
    type: 'save',
    payload: {
      filterMap: {
        ...filterMap,
      },
    },
  });
}

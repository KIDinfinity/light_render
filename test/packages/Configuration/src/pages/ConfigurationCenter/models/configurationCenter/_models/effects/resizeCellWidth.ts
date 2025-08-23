import lodash from 'lodash';
import type { SagaProps, PayProps,DataFieldProps } from 'configuration/pages/ConfigurationCenter/Utils/Typings';
import {
  ColumnWidth,
} from 'configuration/pages/ConfigurationCenter/Utils/Constant';


export default function* ({ payload }: PayProps, { put, select }: SagaProps) {
  const { fieldName, width } = payload;
  const { functionData } = yield select((state: any) => state.configurationCenter);
  const { max, min } = ColumnWidth;
  const { dataFieldList = [] } = functionData;
  const newDataField = dataFieldList.map((item: DataFieldProps) => {
    if (item.fieldName === fieldName) {
      let size = width;
      if (width > max) {
        size = max;
      } else if (width < min) {
        size = min;
      }
      lodash.set(item, 'columnSize', size);
    }
    return item;
  });
  yield put({
    type: 'saveFunctionData',
    payload: {
      functionData: {
        ...functionData,
        dataFieldList: newDataField,
      },
    },
  });
}

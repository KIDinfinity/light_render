import type { SagaProps, PayProps, DataFieldProps } from 'configuration/pages/ConfigurationCenter/Utils/Typings';
import lodash from 'lodash';

export default function* ({ payload }: PayProps, { put }: SagaProps) {
  const { functionData = {}, loading, connectField = [] } = payload;
  const { dataFieldList = [] } = functionData;
  const newDataField = dataFieldList.map((item: DataFieldProps) => {
    const target = connectField.find((el: any) => el.affectedFieldName === item.fieldName);
    return target ? lodash.assign(item, { loading }) : item;
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

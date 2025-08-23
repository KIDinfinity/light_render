import type { SagaProps, PayProps } from 'configuration/pages/ConfigurationCenter/Utils/Typings';
import {
  transferDataField,
} from 'configuration/pages/ConfigurationCenter/Utils/Transfer';

export default function* ({ payload }: PayProps, { put, select }: SagaProps) {
  const { isShowImageField } = payload;
  const { functionData } = yield select((state: any) => state.configurationCenter);
  const { dataFieldList, dropdownList = [] } = functionData;
  const newDataField = transferDataField({
    dataFieldList,
    dropdownList,
    isDataImageVisible: isShowImageField,
  });
  yield put({
    type: 'save',
    payload: {
      isShowImageField,
      functionData: {
        ...functionData,
        dataFieldList: newDataField,
      },
    },
  });
}

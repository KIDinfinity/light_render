import type { SagaProps, PayProps } from 'configuration/pages/ConfigurationCenter/Utils/Typings';
import { findFunction } from '@/services/ccFunctionControllerService';
import {
  transferDataField,
  transferSearchComponent,
} from 'configuration/pages/ConfigurationCenter/Utils/Transfer';
import {  sortSeq } from 'configuration/pages/ConfigurationCenter/Utils/Common';
import {
  getSearchDefault,
} from 'configuration/pages/ConfigurationCenter/Utils/Search';


export default function* ({ payload }: PayProps, { put, call }: SagaProps) {
  const { functionId } = payload;

  yield put({
    type: 'reset',
  });

  const response = yield call(findFunction, {
    functionId,
  });

  if (response && response.success) {
    const functionData = response.resultData;
    const {
      searchComponentList = [],
      dataFieldList = [],
      operationList = [],
      dropdownList = [],
    } = functionData;

    const newFunctionData = {
      ...functionData,
      operationList: operationList
        ? operationList.map((el: string) => el && el.toLowerCase())
        : [],
      //@ts-ignore
      searchComponentList: transferSearchComponent({
        searchComponentList,
        dropdownList,
      }).sort(sortSeq('componentSeq')),
      dataFieldList: transferDataField({
        dataFieldList,
        isDataImageVisible: false,
        dropdownList,
      }),
    };

    const searchDefault = getSearchDefault(newFunctionData);

    yield put({
      type: 'saveFunctionData',
      payload: {
        functionData: newFunctionData,
        searchDefault,
        isShowImageField: false,
      },
    });
  }
}

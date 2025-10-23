import type { SagaProps, PayProps } from 'configuration/pages/ConfigurationCenter/Utils/Typings';
import { findFunction } from '@/services/ccFunctionControllerService';
import { sortSeq } from 'configuration/pages/ConfigurationCenter/Utils/Common';
import {
  transferDataField,
  transferSearchComponent,
} from 'configuration/pages/ConfigurationCenter/Utils/Transfer';


import {
  getSearchDefault,
} from 'configuration/pages/ConfigurationCenter/Utils/Search';

export default function* ({ payload }: PayProps, { put, call }: SagaProps) {
  const { dataImageMenu } = payload;
  const { id: functionId } = dataImageMenu;
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
      operationList: operationList.map((el: any) => el && el.toLowerCase()),
      //@ts-ignore
      searchComponentList: transferSearchComponent({
        searchComponentList,
        dropdownList,
      }).sort(sortSeq('componentSeq')),
      dataFieldList: transferDataField({
        dataFieldList,
        dropdownList,
        isDataImageVisible: false,
      }),
    };
    yield put({
      type: 'saveFunctionData',
      payload: {
        dataImageFunction: newFunctionData,
        dataImageMenu,
        searchDefault: getSearchDefault(newFunctionData),
      },
    });
  }
}

import lodash from 'lodash';
import { findFunctionByTask } from '@/services/ccJpDataControllerService';
import { getSearchDefault } from 'configuration/pages/ConfigurationCenter/Utils/Search';
import {
  transferSearchComponent,
  transferDataField,
} from 'configuration/pages/ConfigurationCenter/Utils/Transfer';

export default function* (_: any, { put, call, select }: any) {
  const { processInstanceId } = yield select((state: any) => ({
    taskNotEditable: state.claimEditable?.taskNotEditable,
    processInstanceId: state.processTask?.getTask?.processInstanceId,
  }));
  const response = yield call(findFunctionByTask, { caseNo: processInstanceId });

  if (response?.success) {
    const functionData = response?.resultData || {};
    const {
      searchComponentList = [],
      dataFieldList = [],
      operationList = [],
      dropdownList = [],
    } = functionData;
    const searchDefault = getSearchDefault(functionData);
    const newFunctionData = {
      ...functionData,
      operationList: operationList
        ? lodash.map(operationList, (el: string) => el && el.toLowerCase())
        : [],
      // @ts-ignore
      searchComponentList: transferSearchComponent({
        searchComponentList,
        dropdownList,
      }),
      dataFieldList: transferDataField({
        dataFieldList,
        isDataImageVisible: false,
        dropdownList,
      }),
    };

    yield put({
      type: 'saveFunctionData',
      payload: {
        functionData: newFunctionData,
        formData: searchDefault?.params || {},
      },
    });
  }
}

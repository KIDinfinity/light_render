import lodash from 'lodash';
import { jpFindFunction } from '@/services/ccJpDataControllerService';
import { getSearchDefault } from 'configuration/pages/ConfigurationCenter/Utils/Search';
import {
  transferSearchComponent,
  transferDataField,
} from 'configuration/pages/ConfigurationCenter/Utils/Transfer';

export default function* ({ payload }: any, { put, call, select }: any) {
  const { functionId } = payload;
  const response = yield call(jpFindFunction, { functionId });

  if (response?.success) {
    const functionData = response?.resultData || {};
    const {
      searchComponentList = [],
      dataFieldList = [],
      operationList = [],
      dropdownList = [],
    } = functionData;

    const sortOrders = yield select((state: any) => state.configurationController.sortOrders);

    const newFunctionData = {
      ...functionData,
      operationList: operationList
        ? lodash.map(operationList, (el: string) => el && el.toLowerCase())
        : [],
      searchComponentList: transferSearchComponent({
        searchComponentList,
        dropdownList,
        description: false,
      }),
      dataFieldList: transferDataField({
        dataFieldList,
        isDataImageVisible: false,
        dropdownList,
        description: false,
        DataImageFieldFilter: false,
      }),
    };

    const search = getSearchDefault(newFunctionData);
    const searchDefault = {
      ...search,
      sortOrders: sortOrders?.[functionData.functionCode] || search.sortOrders,
    };

    yield put({
      type: 'saveListPage',
      payload: {
        listPage: {},
      },
    });
    yield put({
      type: 'saveSearchDefault',
      payload: {
        searchDefault,
      },
    });
    yield put({
      type: 'saveFunction',
      payload: {
        functionData: newFunctionData,
      },
    });
    yield put.resolve({
      type: 'getAuthority',
    });
  }
}

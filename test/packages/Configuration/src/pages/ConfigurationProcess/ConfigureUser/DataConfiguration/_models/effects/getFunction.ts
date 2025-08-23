import lodash from 'lodash';
import { Operation } from 'configuration/pages/NavigatorConfiguration/Enum';
import { findFunctionByTask } from '@/services/ccJpDataControllerService';
import { getSearchDefault } from 'configuration/pages/ConfigurationCenter/Utils/Search';
import moment from 'moment';
import {
  transferDataField,
} from 'configuration/pages/ConfigurationCenter/Utils/Transfer';

export default function* (_: any, { put, call, select }: any) {
  yield put.resolve({
    type: 'getTreeAllOrganization',
  });
  const { processInstanceId, allOrganization } = yield select((state: any) => ({
    processInstanceId: state.processTask?.getTask?.processInstanceId,
    allOrganization: state.configureUserController?.allOrganization,
  }));
  const response = yield call(findFunctionByTask, { caseNo: processInstanceId });

  if (response?.success) {
    const functionData = response?.resultData || {};
    const pageTemplateType = lodash.get(functionData, 'task.pageTemplateType');
    const isAdd = pageTemplateType === Operation.Add;
    const isUpdate = pageTemplateType === Operation.Update;
    const {
      // searchComponentList = [],
      dataFieldList = [],
      operationList = [],
      dropdownList = [],
    } = functionData;
    const newDataFieldList = isAdd
      ? lodash.map(dataFieldList, (item: any) => ({
          ...item,
          editable: true,
        }))
      : dataFieldList;

    const searchDefault = getSearchDefault(functionData);
    const newFunctionData = {
      ...functionData,
      operationList: operationList
        ? lodash.map(operationList, (el: string) => el && el.toLowerCase())
        : [],
      // searchComponentList: transferSearchComponent({
      //   searchComponentList,
      //   dropdownList,
      //   description: false,
      // }),
      dataFieldList: transferDataField({
        dataFieldList: newDataFieldList,
        isDataImageVisible: false,
        dropdownList,
        cascaderList: [{ fieldName: 'group_name', cascaderDatas: allOrganization }],
        description: false,
      }),
    };
    yield put.resolve({
      type: 'saveFunctionData',
      payload: {
        functionData: newFunctionData,
        formData: searchDefault?.params || {},
        headerData: {
          effectiveDate: moment().format(),
          expiryDate: moment('2999-12-31').format(),
        },
      },
    });
    if (!isUpdate) {
      yield put({
        type: 'getAllGroupInfo',
      });
    }
    yield put({
      type: 'getTotalPermissionLists',
    });
    yield put({
      type: 'getAllGroupUsers',
    });
  }
}

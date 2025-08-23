import lodash from 'lodash';
import { Operation } from 'configuration/pages/NavigatorConfiguration/Enum';
import { findFunctionByTask } from '@/services/ccJpDataControllerService';
import { getSearchDefault } from 'configuration/pages/ConfigurationCenter/Utils/Search';
import { isExistRejectTask } from '@/services/ccTaskControllerService';
import { serialize as objectToFormData } from 'object-to-formdata';
import moment from 'moment';
import {
  transferDataField,
} from 'configuration/pages/ConfigurationCenter/Utils/Transfer';
import { Role_dataFieldList } from 'configuration/config/blackList';

export default function* (_: any, { put, call, select }: any) {
  const { processInstanceId } = yield select((state: any) => ({
    processInstanceId: state.processTask?.getTask?.processInstanceId,
  }));
  const response = yield call(findFunctionByTask, { caseNo: processInstanceId });

  if (response?.success) {
    const functionData = response?.resultData || {};
    const pageTemplateType = lodash.get(functionData, 'task.pageTemplateType');
    const isAdd = pageTemplateType === Operation.Add;
    const isUpdate = pageTemplateType === Operation.Update;
    const isUpdateMultiple = pageTemplateType === Operation.UPDATE_Multiple;
    const {
      // searchComponentList = [],
      dataFieldList = [],
      operationList = [],
      dropdownList = [],
    } = functionData;
    const filterdDataFieldList = lodash.map(dataFieldList, (item: any) => {
      const blackList = lodash.map(Role_dataFieldList, (rItem) => rItem?.fieldName);
      if (lodash.includes(blackList, item?.fieldName)) {
        return { ...item, visible: false };
      }
      return item;
    });
    const newDataFieldList = isAdd
      ? lodash.map(filterdDataFieldList, (item: any) => ({
          ...item,
          editable: true,
        }))
      : filterdDataFieldList;
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
    yield put({
      type: 'getTotalRoleLists',
    });
    const existResponse = yield call(
      isExistRejectTask,
      objectToFormData({
        caseNo: processInstanceId,
      })
    );
    const isReject = existResponse?.resultData;
    // update UPDATE_Multiple且是rejected回来的时候   getPermissionInfo 需要listPage调用完之后 orderBy重排数据
    if (!isUpdate || (!isUpdateMultiple && isReject)) {
      yield put({
        type: 'getPermissionInfo',
      });
    }
  }
}

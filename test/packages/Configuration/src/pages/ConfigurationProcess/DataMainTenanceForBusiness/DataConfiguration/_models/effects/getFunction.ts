import lodash from 'lodash';
import { Operation } from 'configuration/pages/NavigatorConfiguration/Enum';
import { findFunctionByTask } from '@/services/ccJpDataControllerService';
import { getSearchDefault } from 'configuration/pages/ConfigurationCenter/Utils/Search';
import moment from 'moment';
import {
  transferSearchComponent,
  transferDataField,
} from 'configuration/pages/ConfigurationCenter/Utils/Transfer';

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

    const {
      searchComponentList = [],
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

    const authMap = {
      add: `${functionData?.functionCode}_add`,
      update: `${functionData?.functionCode}_update`,
    };
    const resourceCodes = [authMap.add, authMap.update];
    const commonAuthorityList = yield select(
      (state: any) => state.authController?.commonAuthorityList
    );
    const authority = resourceCodes.reduce((result, item) => {
      const findItem = commonAuthorityList.find(
        (authorityItem: any) => authorityItem.authorityCode === item
      );
      if (findItem) {
        lodash.set(result, item, findItem.result);
      }
      return result;
    }, {});

    const newOperationList = lodash.filter(
      lodash.compact([
        ...lodash.map(operationList, (el: string) => el && el.toLowerCase()),
        'add',
        'update',
      ]),
      (item: string) => {
        return lodash.has(authority, authMap[item]) ? lodash.get(authority, authMap[item]) : true;
      }
    );

    const newFunctionData = {
      ...functionData,
      operationList: newOperationList,
      searchComponentList: transferSearchComponent({
        searchComponentList,
        dropdownList,
        description: false,
      }),
      dataFieldList: transferDataField({
        dataFieldList: newDataFieldList,
        isDataImageVisible: false,
        dropdownList,
        description: false,
      }),
    };
    yield put({
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
  }
}

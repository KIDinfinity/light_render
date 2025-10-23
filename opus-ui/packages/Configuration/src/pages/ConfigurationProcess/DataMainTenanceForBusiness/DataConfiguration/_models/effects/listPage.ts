import { handlerSearchParams } from 'configuration/pages/ConfigurationCenter/Utils/Search';
import { taskData } from '@/services/ccJpDataControllerService';
import { formUtils } from 'basic/components/Form';
import { getObjectData } from 'configuration/utils';

import lodash from 'lodash';

export default [
  function* ({ payload = {} }: any, { put, call, select }: any) {
    const {
      functionData,
      caseNo,
      isUpdate,
      isUpdateMultiple,
      formData,
      isAdd,
      taskNotEditable,
    } = yield select((state: any) => ({
      functionData: state.dataConfigurationController?.functionData,
      caseNo: state.processTask.getTask?.processInstanceId,
      isUpdate: state.dataConfigurationController?.isUpdate,
      isUpdateMultiple: state.dataConfigurationController?.isUpdateMultiple,
      formData: state.dataConfigurationController?.formData,
      isAdd: state.dataConfigurationController?.isAdd,
      taskNotEditable: state.claimEditable.taskNotEditable,
    }));

    const { id: functionId, functionCode, dataFieldList } = functionData;

    const pageSize = isAdd ? { pageSize: 99999 } : {};

    const newParams = handlerSearchParams(
      {
        ...payload,
        functionId,
        functionCode,
      },
      functionData
    );

    const response = yield call(taskData, {
      ...newParams,
      caseNo,
      page: {
        ...newParams?.page,
        ...pageSize,
      },
    });
    if (response?.success) {
      if (isUpdate) {
        const record = response?.resultData?.rows?.[0];
        yield put({
          type: 'saveFormData',
          payload: {
            formData: record,
          },
        });
        yield put({
          type: 'queryGangedDropdownByFunction',
          payload: {
            record,
          },
        });
        yield put({
          type: 'getVersionList',
        });
      }
      const newFormData = getObjectData(formUtils.cleanValidateData(formData));
      const listPage = response?.resultData;
      const newRows = isUpdateMultiple
        ? lodash.map(listPage?.rows, (item: any) => ({
            ...item,
            ...newFormData,
          }))
        : listPage?.rows;
      yield put({
        type: 'saveListPage',
        payload: {
          listPage: {
            ...listPage,
            pageSize: newParams?.page?.pageSize || response?.resultData?.pageSize,
            rows: newRows,
          },
          isOrigin: true,
        },
      });
      if (isUpdateMultiple) {
        const changeContent = response?.resultData?.rows[0]?.change_content;
        const multipleFormData = lodash
          .chain(dataFieldList)
          .filter((item) => (!taskNotEditable ? item.visible && item.editable : []))
          .reduce((result, item) => {
            const current = lodash.find(changeContent, (val) => val.fieldName === item.fieldName);
            if (current) {
              return current?.newValue !== undefined
                ? { ...result, [current.fieldName]: current?.newValue }
                : result;
            }
            return result;
          }, {})
          .value();
        yield put({
          type: 'saveFormData',
          payload: {
            formData: multipleFormData,
          },
        });
      }
      if (isAdd && newRows?.length) {
        yield put({
          type: 'findDuplicateData',
        });
      }
    }
  },
  { type: 'takeLatest' },
];

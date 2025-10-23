import { handlerSearchParams } from 'configuration/pages/ConfigurationCenter/Utils/Search';
import { taskData } from '@/services/ccJpDataControllerService';
import { isExistRejectTask } from '@/services/ccTaskControllerService';
import OperationType from 'configuration/pages/ConfigurationCenter/Enum/OperationType';
import { formUtils } from 'basic/components/Form';
import { getObjectData } from 'configuration/utils';
import { serialize as objectToFormData } from 'object-to-formdata';
import lodash from 'lodash';

export default [
  function* ({ payload = {} }: any, { put, call, select }: any) {
    const { isAutoSearch } = payload;
    const {
      functionData,
      caseNo,
      isUpdate,
      isUpdateMultiple,
      formData,
      isAdd,
      taskNotEditable,
    } = yield select((state: any) => ({
      functionData: state.configureRoleController?.functionData,
      caseNo: state.processTask.getTask?.processInstanceId,
      isUpdate: state.configureRoleController?.isUpdate,
      isUpdateMultiple: state.configureRoleController?.isUpdateMultiple,
      formData: state.configureRoleController?.formData,
      isAdd: state.configureRoleController?.isAdd,
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

        // 前端进行sortBy 排序 高亮置顶
        if (isAutoSearch) {
          yield put({
            type: 'getPermissionInfo',
          });
        }
      }
      const newFormData = getObjectData(formUtils.cleanValidateData(formData));
      const listPage = response?.resultData;
      let newRows = isUpdateMultiple
        ? lodash.map(listPage?.rows, (item: any) => ({
            ...item,
            data: { ...item?.data, ...newFormData?.data },
            subSection: [...item?.subSection, ...(newFormData?.subSection || [])],
          }))
        : listPage?.rows;
      newRows = lodash.map(newRows, (item: any) => {
        return {
          ...item,
          data: { ...item?.data, '#operation': isAdd ? OperationType.add : OperationType.update },
          subSection: lodash.map(item?.subSection, (subItem) => {
            return {
              ...subItem,
              subSection: null,
            };
          }),
        };
      });
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
        const existResponse = yield call(
          isExistRejectTask,
          objectToFormData({
            caseNo,
          })
        );
        const isReject = existResponse?.resultData;
        if (!isReject) return;
        const list = response?.resultData?.rows || [];
        const changeContent = list?.[0]?.data?.change_content;
        const userExtraData = lodash
          .chain(dataFieldList)
          .filter((item) => (!taskNotEditable ? item.visible : []))
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
        const subSection = lodash.reduce(
          list,
          (newList, item): any => {
            const subSectionList = lodash.filter(
              item?.subSection,
              (SubItem: any) =>
                SubItem?.data?.change_content && SubItem?.data?.change_content.length
            );
            let addList = [...newList];
            // 去重
            lodash.forEach(subSectionList, (Fitem: any) => {
              const exist = lodash.some(
                newList,
                (nItem) => nItem?.data?.permission_code === Fitem?.data?.permission_code
              );
              if (!exist) {
                addList = [...addList, Fitem];
              }
            });

            return addList;
          },
          []
        );
        yield put({
          type: 'saveFormData',
          payload: {
            formData: {
              ...newFormData,
              data: { ...newFormData?.data, ...userExtraData },
              subSection: [...(subSection || [])],
            },
          },
        });

        // 前端进行sortBy 排序 高亮置顶
        if (isAutoSearch) {
          yield put({
            type: 'getPermissionInfo',
          });
        }
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

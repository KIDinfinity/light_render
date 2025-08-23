import lodash from 'lodash';
import { assembleDefaultDataForSave } from 'basic/utils/SnapshotTool';
import { EOptionType } from 'basic/enum';

import moment from 'moment';
import { taskGoBack } from '@/utils/task';
import { serialize as objectToFormData } from 'object-to-formdata';
import { handleExportTemplate } from 'configuration/pages/ConfigurationCenter/Utils/ExcelUtils';
import { showErrors } from 'configuration/pages/ConfigurationCenter/Utils/Common';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import handleMessageModal, { handleWarnMessageModal } from '@/utils/commonMessage';
import BPM from 'bpm/pages/OWBEntrance';
import { requestHandleType } from 'bpm/enum/requestHandleType';
import { tenant, Region } from '@/components/Tenant';
import { Mode } from 'configuration/constant';
import { getIsUnSaveForm } from 'configuration/utils';
import { checkNoneEdit } from './Utils';

// const getSubmitRecords = (changeData: any) => {
//   const handleChangeData = lodash.map(changeData, (data: any) => {
//     // eslint-disable-next-line no-param-reassign
//     const item=getObjectData(data);
//     const extraIds = { id: item?.data?.id ? item?.data?.id : uuidv4() };
//     return {
//       ...item,
//       data: { ...item?.data, ...extraIds },
//       subSection: !lodash.isEmpty(item?.subSection)
//         ? lodash.map(item?.subSection, (sectionItem: any) => {
//           return {
//             ...sectionItem,
//             data: {
//               ...sectionItem?.data,
//               id: uuidv4(),
//             },
//           };
//         })
//         : null,
//     };
//   });
//   return handleChangeData;
// };

const getIsNoneEdit = (claimProcessData: any) => {
  const isNoneEdit = checkNoneEdit({
    originRows: claimProcessData?.originRows,
    rows: claimProcessData?.changeData,
    dataFieldList: claimProcessData?.functionData?.dataFieldList,
  });
  return isNoneEdit && !lodash.isEmpty(claimProcessData?.changeData);
};

const submitCallBack = (dispatch: any, confirm: any, isUnSaveForm: any) => {
  // 不是日本才弹窗填写日期
  tenant.region({
    [Region.JP]() {
      if (isUnSaveForm) {
        dispatch({
          type: 'configureRoleController/saveConfirm',
          payload: { confirm: true },
        });
        BPM.buttonAction('submit');
      }
    },
    notMatch() {
      if (confirm) return;
      dispatch({
        type: 'configureRoleController/showWarnModal',
      });
    },
  });
};

export default {
  submit: {
    validate: {
      before: () => {},
      progress: async ({ dispatch }: any) => {
        const claimProcessData = await dispatch({
          type: 'configureRoleController/getClaimProcessData',
        });
        const errors = await dispatch({
          type: 'configureRoleController/validateFields',
        });
        const isNoneEdit = getIsNoneEdit(claimProcessData);
        // 没有修改过
        if (isNoneEdit) {
          return requestHandleType.break;
        }

        // 新增并且表单有值, 或 非日本， 需要弹窗warnning，阻断生命周期
        const isUnSaveForm = getIsUnSaveForm(claimProcessData);
        if (
          !claimProcessData?.confirm &&
          ((claimProcessData?.isAdd && isUnSaveForm) || !tenant.isJP())
        ) {
          return requestHandleType.break;
        }
        return errors;
      },
      after: async ({ dispatch }: any) => {
        const claimProcessData = await dispatch({
          type: 'configureRoleController/getClaimProcessData',
        });

        const isNoneEdit = getIsNoneEdit(claimProcessData);
        if (isNoneEdit) {
          handleMessageModal([
            {
              code: 'err',
              content: formatMessageApi({
                Label_COM_ErrorMessage: 'ERR_000298',
              }),
            },
          ]);
          return;
        }

        const isUnSaveForm = getIsUnSaveForm(claimProcessData);
        if (!claimProcessData?.confirm && claimProcessData?.isAdd && isUnSaveForm) {
          handleWarnMessageModal(
            [
              {
                content: formatMessageApi({
                  Label_COM_WarningMessage: 'WRN_000027',
                }),
              },
            ],
            {
              okFn: () => {
                submitCallBack(dispatch, claimProcessData?.confirm, isUnSaveForm);
              },
              cancelFn: () => {
                dispatch({
                  type: 'configureRoleController/saveConfirm',
                  payload: { confirm: false },
                });
              },
            }
          );
          return;
        }
        submitCallBack(dispatch, claimProcessData?.confirm, isUnSaveForm);
      },
    },
    action: async ({ dispatch, taskDetail }: any) => {
      const dataForSubmit = await dispatch({
        type: 'configureRoleController/getClaimProcessData',
      });
      const { processInstanceId, taskId, processDefId } = lodash.pick(taskDetail, [
        'processInstanceId',
        'taskId',
        'processDefId',
      ]);
      const dataForSave = await assembleDefaultDataForSave({
        taskDetail,
        optionType: EOptionType.Submit,
        dataForSubmit,
      });
      const effectiveDate = dataForSubmit?.headerData?.effectiveDate;
      const expiryDate = dataForSubmit?.headerData?.expiryDate;
      const records = dataForSubmit?.changeData;
      // const records = getSubmitRecords(changeData);
      const submitData = {
        functionId: dataForSubmit?.functionData?.id,
        caseCategory: taskDetail?.caseCategory,
        records,
        taskId,
        caseNo: processInstanceId,
        pageTemplateType: dataForSubmit?.pageTemplateType,
        operator: dataForSubmit?.operator,
        processDefinitionId: processDefId,
        effectiveDate: effectiveDate ? moment(effectiveDate).format('YYYY-MM-DD') : effectiveDate,
        expiryDate: expiryDate ? moment(expiryDate).format('YYYY-MM-DD') : expiryDate,
      };
      return {
        1: submitData,
        2: dataForSave,
      };
    },
    after: async ({ dispatch }: any) => {
      const mode = await dispatch({
        type: 'configurationController/getArrowModes',
      });
      if (mode === Mode.Expansion) {
        dispatch({
          type: 'configurationController/hideModal',
        });
        dispatch({
          type: 'configurationController/refreshResult',
        });
      } else {
        taskGoBack();
      }
    },
    anyway: ({ dispatch, responseCollect }: any) => {
      const code = lodash.get(responseCollect, '1.promptMessages[0].code');
      const success = lodash.get(responseCollect, '1.success');
      dispatch({
        type: 'configureRoleController/saveConfirm',
        payload: { confirm: false },
      });
      if (
        !success &&
        ['[cc].request.records.duplicate.error', '[cc].request.records.duplicate.warn'].includes(
          code
        )
      ) {
        dispatch({
          type: 'configureRoleController/findDuplicateData',
          payload: {
            isWarning: code === '[cc].request.records.duplicate.warn',
          },
        });
      }
    },
  },
  save: {
    timer: 30000,
    action: async ({ dispatch, taskDetail, isAuto }: any) => {
      const dataForSubmit = await dispatch({
        type: 'configureRoleController/getClaimProcessData',
      });
      if (
        !dataForSubmit ||
        !dataForSubmit?.functionData ||
        !dataForSubmit?.functionData?.dataFieldList
      ) {
        return { 1: requestHandleType.break };
      }
      const dataForSave = await assembleDefaultDataForSave({
        taskDetail,
        optionType: isAuto ? EOptionType.AutoSave : EOptionType.Save,
        dataForSubmit,
      });
      return { 1: dataForSave };
    },
  },
  upload: {
    isShowNotice: false,
    type: 'upload',
    hidden: ({ claimStates }: any) => {
      return (
        !claimStates?.isAdd ||
        !lodash.includes(claimStates?.functionData?.operationList, 'importdata')
      );
    },
    onChange: async ({ files, dispatch }: any) => {
      await dispatch({
        type: 'configureRoleController/importExcel',
        payload: objectToFormData({
          file: files[0],
        }),
      });
    },
    after: () => {},
  },
  template: {
    isShowNotice: false,
    hidden: ({ claimStates }: any) => {
      return (
        !claimStates?.isAdd ||
        !lodash.includes(claimStates?.functionData?.operationList, 'exporttemplate')
      );
    },
    after: async ({ claimStates, dispatch }: any) => {
      const { id: functionId, functionName } = lodash.get(claimStates, 'functionData', {});
      const response: any = await dispatch({
        type: 'configureRoleController/exportTemplate',
        payload: {
          functionId,
        },
      });
      if (lodash.isPlainObject(response) && response?.success) {
        const { structure, recordOperationType } = response.resultData;
        handleExportTemplate(structure, recordOperationType, functionName);
      } else {
        showErrors(response?.promptMessages);
      }
    },
  },
};

import lodash from 'lodash';
import moment from 'moment';
import { taskGoBack } from '@/utils/task';
import { serialize 
as objectToFormData } from 'object-to-formdata';
import { handleExportTemplate } from 'configuration/pages/ConfigurationCenter/Utils/ExcelUtils';
import { showErrors } from 'configuration/pages/ConfigurationCenter/Utils/Common';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import handleMessageModal, { handleWarnMessageModal } from '@/utils/commonMessage';
import { requestHandleType } from 'bpm/enum/requestHandleType';
import { tenant, Region } from '@/components/Tenant';
import { Mode } from 'configuration/constant';
import { getIsUnSaveForm } from 'configuration/utils';
import { EOptionType } from 'basic/enum';
import { assembleDefaultDataForSave, assemblePendingDataForSave } from 'basic/utils/SnapshotTool';
import CaseCategory from 'enum/CaseCategory';
import { checkNoneEdit } from './Utils';

// const getIsUnSaveForm = (claimProcessData: any) => {
//   const targetRecord = (lodash.chain(claimProcessData.changeData) as any)
//     .find({ cc_key: claimProcessData?.formData?.cc_key })
//     .value();
//   const isMatchRecord =
//     !targetRecord ||
//     (targetRecord &&
//       !lodash.isEqual(getValueData(claimProcessData.formData), getValueData(targetRecord)));
//   const isUnSaveForm =
//     !claimProcessData?.isUpdateMultiple &&
//     !lodash.isEmpty(claimProcessData?.formData) &&
//     isMatchRecord;

//   return isUnSaveForm;
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
          type: 'dataConfigurationController/saveConfirm',
          payload: { confirm: true },
        });
        // BPM.trigger({ buttonCode: 'submit' });
      }
    },
    notMatch() {
      if (confirm) return;
      dispatch({
        type: 'dataConfigurationController/showWarnModal',
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
          type: 'dataConfigurationController/getClaimProcessData',
        });
        const errors = await dispatch({
          type: 'dataConfigurationController/validateFields',
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
          type: 'dataConfigurationController/getClaimProcessData',
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
                  type: 'dataConfigurationController/saveConfirm',
                  payload: { confirm: false },
                });
              },
            }
          );
          return;
        }
        console.log({
          confirm: claimProcessData?.confirm,
          isUnSaveForm,
          region: tenant.region(),
        });
        submitCallBack(dispatch, claimProcessData?.confirm, isUnSaveForm);
      },
    },
    action: async ({ dispatch, taskDetail }: any) => {
      const claimProcessData = await dispatch({
        type: 'dataConfigurationController/getClaimProcessData',
      });
      const { processInstanceId, taskId, processDefId } = lodash.pick(taskDetail, [
        'processInstanceId',
        'taskId',
        'processDefId',
      ]);
      const dataForSave = await assemblePendingDataForSave({
        optionType: EOptionType.Submit,
        taskDetail,
        dataForSubmit: claimProcessData,
      });
      const effectiveDate = claimProcessData?.headerData?.effectiveDate;
      const expiryDate = claimProcessData?.headerData?.expiryDate;
      const submitData = {
        functionId: claimProcessData?.functionData?.id,
        caseCategory: CaseCategory.BP_DT_CTG01,
        records: claimProcessData?.changeData,
        taskId,
        caseNo: processInstanceId,
        pageTemplateType: claimProcessData?.pageTemplateType,
        operator: claimProcessData?.operator,
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
        type: 'dataConfigurationController/saveConfirm',
        payload: { confirm: false },
      });
      if (
        !success &&
        ['[cc].request.records.duplicate.error', '[cc].request.records.duplicate.warn'].includes(
          code
        )
      ) {
        dispatch({
          type: 'dataConfigurationController/findDuplicateData',
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
      const claimProcessData = await dispatch({
        type: 'dataConfigurationController/getClaimProcessData',
      });
      if (
        !claimProcessData ||
        !claimProcessData?.functionData ||
        !claimProcessData?.functionData?.dataFieldList
      ) {
        return { 1: requestHandleType.break };
      }

      const dataForSave = await assembleDefaultDataForSave({
        taskDetail,
        optionType: isAuto ? EOptionType.AutoSave : EOptionType.Save,
        dataForSubmit: claimProcessData,
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
        type: 'dataConfigurationController/importExcel',
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
        type: 'dataConfigurationController/exportTemplate',
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

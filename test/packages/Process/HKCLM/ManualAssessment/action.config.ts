import { Region, tenant } from '@/components/Tenant';
import handleMessageModal from '@/utils/commonMessage';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { getSubmitData } from '@/utils/modelUtils/claimUtils';
import { taskGoBack } from '@/utils/task';
import { notification } from 'antd';
import CaseCategory from 'basic/enum/CaseCategory/hk';
import { EOptionType } from 'basic/enum/EOptionType';
import TaskDefKey from 'basic/enum/TaskDefKey/hk';
import { assembleDefaultDataForSave } from 'basic/utils/SnapshotTool';
import { requestHandleType } from 'bpm/enum/requestHandleType';
import { VLD_000573 } from 'claim/pages/HongKong/FurtherClaim/validator';
import getRedepositError from 'claim/pages/PaymentAllocation/_function/getRedepositError';
import {
  errorMessageModal,
  errorMessageWithValuesModal,
  warnMessageModal,
} from 'claim/pages/utils/popModel';
import lodash, { isEmpty } from 'lodash';
import { validateSubmit } from 'process/Utils';
import { NAMESPACE } from './activity.config';
import { wholeEntities } from './_models/dto/EntriesModel';

/**
 * TODO:error,warn提示弹窗应该放在一个方法里面处理
 */

export default {
  submit: {
    validate: async ({ dispatch, taskDetail }: any) => {
      if (taskDetail.taskDefKey === 'HK_CLM_ACT008') {
        const errors: any = await dispatch({
          type: `${NAMESPACE}/validateCertainFields`,
          payload: {
            formId: 'Treatment.Basic',
            fields: ['doctor'],
          },
        });
        return errors;
      }
      dispatch({
        type: `${NAMESPACE}/packAdjustmentFactorForSubmit`,
      });
      await dispatch({
        type: `${NAMESPACE}/packDataForSubmit`,
      });

      const dataForSubmit = await dispatch({
        type: `${NAMESPACE}/getDataForSubmit`,
      });

      const { checkNumberRefresh, policyAgent, promptMessages, claimAdjustmentFactorList } =
        lodash.pick(dataForSubmit, [
          'checkNumberRefresh',
          'promptMessages',
          'policyAgent',
          'claimAdjustmentFactorList',
        ]);

      // 判断更改agent number是否有点击refresh icon
      if (!checkNumberRefresh && policyAgent?.agentNumber) {
        notification.error({
          message: formatMessageApi({
            Label_COM_ErrorMessage: 'MSG_000415',
          }),
        });
        return requestHandleType.break;
      }

      //VLD_000574 updating some key claim information which may affect serial claim selection
      const isSame = await dispatch({
        type: 'claimCaseController/compareClaimDataV2',
        payload: {
          targetDataPath: `${NAMESPACE}/getDataForSubmit`,
        },
      });

      if (!isSame) {
        // eslint-disable-next-line no-return-await
        return await errorMessageModal(
          [{ Label_COM_Message: 'MSG_000495' }],
          requestHandleType.break
        );
      }

      if (isSame) {
        const comparedClaimData = await dispatch({
          type: 'claimCaseController/getComparedClaimData',
        });

        if (!VLD_000573(dataForSubmit, comparedClaimData)) {
          // eslint-disable-next-line no-return-await
          return await errorMessageModal(
            [{ Label_COM_Message: 'MSG_000494' }],
            requestHandleType.break
          );
        }
      }
      const RedepositError = getRedepositError(dataForSubmit);
      if (RedepositError && !isEmpty(RedepositError)) {
        // eslint-disable-next-line no-return-await
        return await errorMessageWithValuesModal(RedepositError, requestHandleType.break);
      }

      if (lodash.size(claimAdjustmentFactorList) > 0) {
        const filterFactorList = lodash.filter(
          claimAdjustmentFactorList,
          (el: any) =>
            !lodash.isEmpty(el.factorValueType) && el.isSelected && !lodash.isNumber(el.factorValue)
        );
        if (!lodash.isEmpty(filterFactorList)) {
          handleMessageModal([
            { content: formatMessageApi({ Label_COM_WarningMessage: 'MSG_000595' }) },
          ]);
          return requestHandleType.break;
        }
      }

      // 校验当前payable change是否有做recalculation，如果没有，提示错误，终止submit
      const ignoreExpectDecisionWarn = await validateSubmit({
        dispatch,
        nameSpace: NAMESPACE,
        validatorType: 'TypePayable',
      });

      if (!ignoreExpectDecisionWarn) {
        return requestHandleType.break;
      }

      if (promptMessages) {
        handleMessageModal(promptMessages);
        return requestHandleType.break;
      }

      await dispatch({
        type: 'formCommonController/handleSubmited',
      });

      const errors: any = await dispatch({
        type: `${NAMESPACE}/validateFields`,
      });

      // 对接payment allocation
      const backData: any = await dispatch({
        type: 'paymentAllocation/allocationDockings',
        payload: {
          claimData: dataForSubmit,
        },
      });
      const { errors: allocationErrors, output } = backData;
      // 将返回的claim数据同步到主页面
      if (!lodash.isEmpty(output)) {
        dispatch({
          type: `${NAMESPACE}/savePaymentAllocation`,
          payload: output,
        });
      }
      const hasNcdFlagChange: any = await dispatch({
        type: `${NAMESPACE}/getNcdFlagWarn`,
      });

      if (!!hasNcdFlagChange) {
        try {
          const confirm = await warnMessageModal(
            [{ Label_COM_WarningMessage: 'MSG_001245' }],
            true,
            false
          );
          if (!confirm) {
            return requestHandleType.break;
          }
        } catch (err) {
          return requestHandleType.break;
        }
      }

      const tempErrors = [...errors, ...allocationErrors];
      return tempErrors;
    },
    action: async ({ taskDetail, dispatch, allveriables }: any) => {
      const { taskDefKey, taskStatus, processInstanceId, taskId, caseCategory, activityKey } =
        lodash.pick(taskDetail, [
          'taskId',
          'taskStatus',
          'processInstanceId',
          'taskDefKey',
          'caseCategory',
          'activityKey',
        ]);
      const dataForBaseInfoParam = {
        activityCode: taskDefKey,
        activityStatus: taskStatus,
        caseNo: processInstanceId,
        categoryCode: '',
        creator: '',
        deleted: 0,
        gmtCreate: '',
        gmtModified: '',
        id: '',
        modifier: '',
        taskId,
        transId: '',
      };

      const dataForSubmit = await dispatch({
        type: `${NAMESPACE}/getDataForSubmit`,
      });
      const dataForSave = await assembleDefaultDataForSave({
        dataForSubmit,
        taskDetail,
        optionType: EOptionType.Submit,
      });

      const getHK = () => {
        const defaultHK = {
          1: dataForBaseInfoParam,
          2: { taskId },
          3: getSubmitData({ taskDetail, dataForSubmit, variables: allveriables[1] }),
          4: dataForSave,
        };

        if (
          activityKey === TaskDefKey.HK_CLM_ACT008 &&
          caseCategory === CaseCategory.HK_CLM_CTG003
        ) {
          return {
            1: getSubmitData({ taskDetail, dataForSubmit, variables: allveriables[1] }),
            2: dataForSave,
          };
        }

        return defaultHK;
      };

      const common = {
        1: dataForBaseInfoParam,
        2: getSubmitData({ taskDetail, dataForSubmit, variables: allveriables[1] }),
        3: dataForSave,
      };

      return tenant.region() === Region.HK ? getHK() : common;
    },
    after: async () => {
      taskGoBack();
    },
  },
  save: {
    timer: 30000,
    action: async ({ dispatch, isAuto }: any) => {
      const taskNotEditable = await dispatch({
        type: 'claimEditable/getTaskNotEditable',
      });

      const taskDetail = await dispatch({
        type: 'processTask/getTaskDetail',
      });
      dispatch({
        type: `${NAMESPACE}/packAdjustmentFactorForSubmit`,
      });
      const dataForSubmit = await dispatch({
        type: `${NAMESPACE}/getDataForSubmit`,
      });
      const dataForSave = await assembleDefaultDataForSave({
        taskDetail,
        optionType: isAuto ? EOptionType.AutoSave : EOptionType.Save,
        dataForSubmit,
        taskNotEditable,
      });
      return {
        1: dataForSave,
      };
    },
  },
  reject: {
    action: async ({ taskDetail, dispatch }: any) => {
      const { taskDefKey, taskStatus, processInstanceId, taskId } = lodash.pick(taskDetail, [
        'taskId',
        'taskStatus',
        'processInstanceId',
        'taskDefKey',
      ]);
      const dataForBaseInfoParam = {
        activityCode: taskDefKey,
        activityStatus: taskStatus,
        caseNo: processInstanceId,
        categoryCode: '',
        creator: '',
        deleted: 0,
        gmtCreate: '',
        gmtModified: '',
        id: '',
        modifier: '',
        taskId,
        transId: '',
      };
      const dataForSubmit = await dispatch({
        type: `${NAMESPACE}/getDataForSubmit`,
      });

      const dataForSave = await assembleDefaultDataForSave({
        taskDetail,
        optionType: EOptionType.Reject,
        dataForSubmit,
      });
      return {
        1: dataForBaseInfoParam,
        3: dataForSave,
        4: dataForBaseInfoParam,
      };
    },
    after: async () => {
      taskGoBack();
    },
  },
  split: {
    isShowNotice: false,
    action: async ({ dispatch }: any) => {
      const claimData = await dispatch({
        type: `${NAMESPACE}/getDataForSubmit`,
      });
      dispatch({
        type: 'caseSplitController/splitModalOpen',
        payload: { claimData, wholeEntities },
      });
    },
  },
};

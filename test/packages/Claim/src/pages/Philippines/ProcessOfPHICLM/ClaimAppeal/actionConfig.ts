import lodash from 'lodash';
import { EOptionType } from 'basic/enum/EOptionType';
import { Action } from '@/components/AuditLog/Enum';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { taskGoBack } from '@/utils/task';
import { getSubmitData } from '@/utils/modelUtils/claimUtils';
import { messageModal } from '@/utils/commonMessage';
import { snapShotSchema } from 'claim/schema/Snapshot';
import { wholeEntities } from './_models/dto/EntriesModel';
import { assembleDefaultDataForSave, assemblePHCLMDataForSave } from 'basic/utils/SnapshotTool';

export default {
  submit: {
    validate: async ({ dispatch }) => {
      const dataForSubmit = await dispatch({
        type: 'PHCLMOfAppealCaseController/getDataForSubmit',
      });
      if (!dataForSubmit.selectedCase) {
        messageModal({
          typeCode: 'Label_COM_ErrorMessage',
          dictCode: 'ERR_000136',
          okText: formatMessageApi({ Label_BIZ_Claim: 'venus_claim.label.receivedModalCancel' }),
        });

        return [1];
      }

      await dispatch({
        type: 'formCommonController/handleSubmited',
      });
      const errors: any = await dispatch({
        type: 'PHCLMOfAppealCaseController/validateFields',
      });

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
          type: 'PHCLMOfAppealCaseController/savePaymentAllocation',
          payload: output,
        });
      }

      return [...errors, ...allocationErrors];
    },
    action: async ({ taskDetail, dispatch, allveriables }) => {
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
        type: 'PHCLMOfAppealCaseController/getDataForSubmit',
      });
      const dataForSave = await assembleDefaultDataForSave({
        taskDetail,
        optionType: EOptionType.Submit,
        dataForSubmit,
      });
      const { insured, claimant } = dataForSubmit;
      const variable = {
        ...allveriables[1],
        insuredId: insured?.insuredId,
        claimantName: `${claimant?.firstName}_${claimant?.middleName}_${claimant?.surname}`,
      };
      return {
        1: dataForBaseInfoParam,
        2: getSubmitData({ taskDetail, dataForSubmit, variables: variable }),
        3: dataForBaseInfoParam,
        4: dataForSave,
      };
    },
    after: async () => {
      taskGoBack();
    },
  },
  save: {
    timer: 30000,
    action: async ({ dispatch, taskDetail, EOptionType, isAuto }) => {
      const { taskId, processInstanceId } = lodash.pick(taskDetail, [
        'taskId',
        'processInstanceId',
      ]);
      const dataForSubmit = await dispatch({
        type: 'PHCLMOfAppealCaseController/getDataForSubmit',
      });

      const dataForSave = await assemblePHCLMDataForSave({
        optionType: isAuto ? EOptionType.AutoSave : EOptionType.Save,
        taskDetail,
        dataForSubmit,
        dataSchema: snapShotSchema,
      });

      return {
        1: dataForSave,
      };
    },
  },
  reject: {
    action: async ({ taskDetail, dispatch }) => {
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
        type: 'PHCLMOfAppealCaseController/getDataForSubmit',
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
    after: async ({ dispatch }) => {
      dispatch({
        type: 'auditLogController/logButton',
        payload: {
          action: Action.Reject,
        },
      });
      taskGoBack();
    },
  },
  split: {
    isShowNotice: false,
    validate: async ({ dispatch }) => {
      await dispatch({
        type: 'formCommonController/handleSubmited',
      });
      const errors: any = await dispatch({
        type: 'PHCLMOfAppealCaseController/validateFields',
      });
      return errors;
    },
    action: async ({ dispatch }) => {
      const claimData = await dispatch({
        type: 'PHCLMOfAppealCaseController/getDataForSubmit',
      });
      dispatch({
        type: 'caseSplitController/splitModalOpen',
        payload: { claimData, wholeEntities },
      });
    },
  },
  image: {
    validate: async ({ dispatch, taskDetail }: any) => {
      const dataForSubmit = await dispatch({
        type: 'PHCLMOfAppealCaseController/getDataForSubmit',
      });
      await dispatch({
        type: 'PHCLMOfAppealCaseController/updateMandatoryDoc',
        // operationType ?
        payload: getSubmitData({ taskDetail, dataForSubmit, variables: null }),
      });
    },
  },
};

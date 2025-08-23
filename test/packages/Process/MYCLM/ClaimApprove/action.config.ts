import lodash from 'lodash';
import { assembleDefaultDataForSave } from 'basic/utils/SnapshotTool';
import { EOptionType, ClaimTypeArray, eClaimDecision } from 'basic/enum';
import { add } from '@/utils/precisionUtils';
import { taskGoBack } from '@/utils/task';
import { getSubmitData } from '@/utils/modelUtils/claimUtils';
import { wholeEntities } from 'process/MYCLM/ManualAssessment/_models/dto/EntriesModel';
import logButton from '@/components/AuditLog/API/logButton';
import { createNormalizeData } from '@/utils/claimUtils';

export default {
  submit: {
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
        type: 'MYCLMOfCTG008AssessmentController/getDataForSubmit',
        payload: { clearData: true },
      });

      const dataForSubmitSaveVer = await dispatch({
        type: `MYCLMOfCTG008AssessmentController/getDataForSubmit`,
      });
      const dataForSave = await assembleDefaultDataForSave({
        dataForSubmit: dataForSubmitSaveVer,
        taskDetail,
        optionType: EOptionType.Submit,
      });

      const common = {
        1: dataForBaseInfoParam,
        2: getSubmitData({ taskDetail, dataForSubmit, variables: allveriables[1] }),
        3: dataForBaseInfoParam,
        4: dataForSave,
      };

      return  common;
    },
    after: async () => {
      taskGoBack();
    },
  },
  save: {
    timer: 30000,
    action: async ({ dispatch, taskDetail, isAuto }) => {
      const dataForSubmit = await dispatch({
        type: 'MYCLMOfCTG008AssessmentController/getDataForSubmit',
      });
      const dataForSave = await assembleDefaultDataForSave({
        taskDetail,
        optionType: isAuto ? EOptionType.AutoSave : EOptionType.Save,
        dataForSubmit,
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
        type: 'MYCLMOfCTG008AssessmentController/getDataForSubmit',
        payload: { clearData: true },
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
    action: async ({ dispatch }) => {
      const claimData = await dispatch({
        type: 'MYCLMOfCTG008AssessmentController/getDataForSubmit',
        payload: { clearData: true },
      });
      dispatch({
        type: 'caseSplitController/splitModalOpen',
        payload: { claimData, wholeEntities },
      });
    },
  },
  approval: {
    hidden: ({ businessData = {} }: any) => {
      if (lodash.isEmpty(businessData)) return false;
      const { claimEntities, claimProcessData } = createNormalizeData(businessData, wholeEntities);
      const map = [
        {
          decision: eClaimDecision.approve,
          claimType: [
            ClaimTypeArray.inPatient,
            ClaimTypeArray.Crisis,
            ClaimTypeArray.MI,
            ClaimTypeArray.OP,
          ],
          limit: 1200000,
        },
        {
          decision: eClaimDecision.deny,
          claimType: [
            ClaimTypeArray.inPatient,
            ClaimTypeArray.Crisis,
            ClaimTypeArray.MI,
            ClaimTypeArray.OP,
          ],
          limit: 1000000,
          callback: () => {
            return lodash.reduce(
              claimEntities.invoiceListMap,
              (result, item) => {
                return (result = add(item.expense, result));
              },
              0
            );
          },
        },
        {
          decision: eClaimDecision.exgratia,
          claimType: [
            ClaimTypeArray.inPatient,
            ClaimTypeArray.Crisis,
            ClaimTypeArray.MI,
            ClaimTypeArray.OP,
          ],
          limit: 400000,
        },
        {
          decision: eClaimDecision.approve,
          claimType: [ClaimTypeArray.PA],
          limit: 1000000,
        },
        {
          decision: eClaimDecision.deny,
          claimType: [ClaimTypeArray.PA],
          limit: 1000000,
          callback: () => {
            return lodash.reduce(
              claimEntities.invoiceListMap,
              (result, item) => {
                return (result = add(item.expense, result));
              },
              0
            );
          },
        },
        {
          decision: eClaimDecision.exgratia,
          claimType: [ClaimTypeArray.PA],
          limit: 400000,
        },
      ];
      const { assessmentDecision, totalPayableAmount } = claimProcessData?.claimDecision;
      const claimType =
        claimEntities?.incidentListMap?.[claimProcessData?.incidentList?.[0]]?.claimTypeArray;
      const target = lodash.find(map, (item: any) => {
        return (
          item.decision === assessmentDecision &&
          lodash.intersection(claimType, item.claimType).length > 0
        );
      });
      if (!target) {
        return true;
      }
      if (target.callback && lodash.isFunction(target.callback)) {
        return target.callback() < target.limit;
      }
      return target.limit > totalPayableAmount;
    },
    after: ({ responseCollect, taskDetail, dispatch }: any) => {
      const response = lodash.get(responseCollect, '1');
      if (response && response.success && response.resultData) {
        logButton({
          dispatch,
          buttonCode: 're-Assign',
          taskId: taskDetail?.taskId,
          processInstanceId: taskDetail?.processInstanceId,
          activityKey: taskDetail?.activityKey,
          content: [response.resultData],
        });
      }
    },
  },
};

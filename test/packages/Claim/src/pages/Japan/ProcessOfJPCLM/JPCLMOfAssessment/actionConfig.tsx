import lodash from 'lodash';
import { assembleDefaultDataForSave } from 'basic/utils/SnapshotTool';
import { EOptionType } from 'basic/enum/EOptionType';
import { getSubmitData } from '@/utils/modelUtils/claimUtils';
import { wholeEntities } from './_models/dto/EntriesModel';
import { dontValidateTaskDefKey, preApprovalTaskDefKey, cancelTaskDefKey } from './taskDefKey';
import { requestHandleType } from 'bpm/enum/requestHandleType';
// import { requestHandleType } from 'bpm/enum/requestHandleType';
// import bpm from 'bpm/pages/OWBEntrance';

export default {
  submit: {
    // checkInformationBefore: async ({ dispatch }: any) => {
    //   return false;
    // },
    validate: {
      progress: async ({ dispatch, taskDetail }: any) => {
        let errors: any = [];
        const taskDefKey = taskDetail?.taskDefKey;
        if (!lodash.includes(dontValidateTaskDefKey, taskDefKey)) {
          await dispatch({
            type: 'formCommonController/handleSubmited',
          });

          errors = await dispatch({
            type: 'JPCLMOfClaimAssessmentController/validateFields',
          });

          // 对接payment allocation
          const dataForSubmit = await dispatch({
            type: 'JPCLMOfClaimAssessmentController/getDataForSubmit',
          });

          const backData: any = await dispatch({
            type: 'paymentAllocation/allocationDockings',
            payload: {
              claimData: dataForSubmit,
            },
          });

          const { errors: allocationErrors, output } = backData;
          // 存在错误项则将返回的claim数据同步到主页面

          if (!lodash.isEmpty(output)) {
            dispatch({
              type: 'JPCLMOfClaimAssessmentController/savePaymentAllocation',
              payload: output,
            });
          }

          return [...errors, ...allocationErrors];
        }
        // console.log('errors', errors);
        // 1 return requestHandleType.break to block action
        // return errors.length ? errors: requestHandleType.break;
        // 2 use bpm.trigger({ buttonCode }) for modal ok callback to trigger action
        return errors;
      },
    },
    action: async ({ dispatch, taskDetail, allveriables }: any) => {
      const taskDefKey = taskDetail?.taskDefKey;

      const dataForSubmit = await dispatch({
        type: 'JPCLMOfClaimAssessmentController/getDataForSubmit',
      });

      const dataForSave = await assembleDefaultDataForSave({
        dataForSubmit,
        taskDetail,
        optionType: EOptionType.Submit,
      });

      if (!dataForSubmit) {
        return { 1: requestHandleType.break };
      }
      const dataForActionObj = {
        1: getSubmitData({ taskDetail, dataForSubmit, variables: allveriables[0] }),
      };
      if (!lodash.includes([...preApprovalTaskDefKey, ...cancelTaskDefKey], taskDefKey)) {
        dataForActionObj[2] = dataForSave;
      }
      if (lodash.includes(cancelTaskDefKey, taskDefKey)) {
        dataForActionObj[3] = dataForSave;
      }
      return dataForActionObj;
    },
    anyway: ({ dispatch }: any) => {
      dispatch({
        type: 'formCommonController/handleUnValidating',
      });
    },
  },
  save: {
    timer: 30000,
    action: async ({ dispatch, taskDetail, isAuto }: any) => {
      const dataForSubmit = await dispatch({
        type: 'JPCLMOfClaimAssessmentController/getDataForSubmit',
      });

      const dataForSave = await assembleDefaultDataForSave({
        taskDetail,
        optionType: isAuto ? EOptionType.AutoSave : EOptionType.Save,
        dataForSubmit,
      });
      return { 1: dataForSave };
    },
  },
  reject: {
    action: async ({ dispatch, taskDetail }: any) => {
      const taskId = taskDetail?.taskId;
      const processInstanceId = taskDetail?.processInstanceId;
      const taskDefKey = taskDetail?.taskDefKey;
      const taskStatus = taskDetail?.taskStatus;
      const caseCategory = taskDetail?.caseCategory;
      const dataForSubmit = await dispatch({
        type: 'JPCLMOfClaimAssessmentController/getDataForSubmit',
      });

      const dataForSave = await assembleDefaultDataForSave({
        taskDetail,
        optionType: EOptionType.Reject,
        dataForSubmit,
      });
      const dataForBaseInfoParam = {
        activityCode: taskDefKey,
        activityStatus: taskStatus,
        caseNo: processInstanceId,
        caseCategory,
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
      return {
        1: dataForBaseInfoParam,
        3: dataForSave,
        4: dataForBaseInfoParam,
      };
    },
  },
  split: {
    isShowNotice: false,
    validate: async ({ dispatch }: any) => {
      await dispatch({
        type: 'formCommonController/handleSubmited',
      });
      const errors = await dispatch({
        type: 'JPCLMOfClaimAssessmentController/validateFields',
      });
      return errors;
    },
    action: async ({ dispatch }: any) => {
      const data = await dispatch({
        type: 'JPCLMOfClaimAssessmentController/getDataForSubmit',
      });
      dispatch({
        type: 'caseSplitController/splitModalOpen',
        payload: { claimData: data, wholeEntities },
      });
    },
  },
  tblSearch: {
    isShowNotice: false,
    action: async ({ dispatch }: any) => {
      dispatch({
        type: 'medicalSearch/changeVisible',
        payload: {
          visible: true,
        },
      });
    },
  },
};

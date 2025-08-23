import { eOperationType } from '@/enum/eOperationType';
import { messageModal } from '@/utils/commonMessage';
import { formUtils } from 'basic/components/Form';
import { EOptionType } from 'basic/enum/EOptionType';
import { assembleDefaultDataForSave } from 'basic/utils/SnapshotTool';
import { requestHandleType } from 'bpm/enum/requestHandleType';
import lodash from 'lodash';
import { Action } from '@/components/AuditLog/Enum';
import { OptionType } from 'process/NewBusiness/ManualUnderwriting/_enum';
import { NAMESPACE } from './activity.config';

const handleAgeChange = ({ responseList, dispatch }: any) => {
  if (
    lodash
      .chain(responseList)
      .find((res: any) => res?.success === false)
      .get('promptMessages', [])
      .some((item: any) => item?.code === 'age.has.been.changed')
      .value()
  ) {
    dispatch({
      type: `${NAMESPACE}/saveAgeChange`,
      payload: {
        ageChange: true,
      },
    });
  }
};

const handleOperator = async ({ responseList, dispatch }: any) => {
  const trickButtonServiceOperators = lodash.find(
    responseList,
    (res: any) =>
      res?.success === false && lodash.size(res?.resultData?.trickButtonServiceOperators) > 0
  )?.resultData?.trickButtonServiceOperators;

  if (trickButtonServiceOperators) {
    const handleMap: any = {
      updateBusinessData: () => {
        dispatch({
          type: `${NAMESPACE}/updateBusinessData`,
        });
      },
      deleteSnapshot: () => {
        dispatch({
          type: `${NAMESPACE}/deleteSnpashot`,
        });
      },
      refresh: () => {
        window.location.reload();
      },
    };

    for (const operator of trickButtonServiceOperators) {
      if (handleMap[operator]) {
        await handleMap[operator]();
      }
    }
  }
};

const successFailCallback = ({ responseCollect, dispatch }: any) => {
  if (lodash.values(responseCollect).every((res: any) => res?.success)) {
    return;
  }
  const responseList = lodash.values(responseCollect);

  handleAgeChange({ responseList, dispatch });

  handleOperator({ responseList, dispatch });
};

export default {
  pend: {
    hidden: ({ taskDetail }: any) => {
      const hiddenFlag = taskDetail?.withdraw || taskDetail?.notWait;
      return hiddenFlag;
    },
  },
  submit: {
    validate: async ({ dispatch }: any) => {
      const sustainabilityValidate = await dispatch({
        type: `${NAMESPACE}/validateSustainability`,
        payload: {
          type: 'main'
        }
      });
      if (!sustainabilityValidate) {
        messageModal({
          typeCode: 'Label_COM_ErrorMessage',
          dictCode: 'MSG_000794',
        });
        return requestHandleType.break;
      }
      const errors = await dispatch({
        type: `${NAMESPACE}/validateFields`,
      });
      return errors;
    },
    action: async ({ taskDetail, dispatch }: any) => {
      const dataForSubmit = await dispatch({
        type: `${NAMESPACE}/getDataForSubmit`,
      });
      const params = {
        businessData: dataForSubmit,
        ...lodash.pick(taskDetail, [
          // 'activityKey',
          'assignee',
          'businessNo',
          'caseCategory',
          'caseNo',
          'inquiryBusinessNo',
          // TODO：这个字段是否会有
          'companyCode',
          'taskId',
        ]),
        activityKey: taskDetail?.taskDefKey,
        operationType: eOperationType.submit,
        intactAction: (result) => {
          dispatch({
            type: `${NAMESPACE}/isBackAuditLog`,
            payload: {
              isBack: !!result,
              isSubmit: true,
            },
          });
        },
      };
      return {
        1: params,
        2: params,
        3: params,
        4: params,
      };
    },
    anyway: async ({ responseCollect, dispatch, taskDetail }: any) => {
      const applicationNo = lodash.get(taskDetail, 'applicationNo');
      dispatch({
        type: `${NAMESPACE}/loadProposalFlags`,
        payload: {
          applicationNo,
        },
      });
      dispatch({
        type: 'navigatorInformationController/loadAllCategoryInformation',
        payload: {},
      });
      dispatch({
        type: `${NAMESPACE}/getRiskIndicator`,
        payload: { applicationNo: taskDetail.businessNo },
      });

      successFailCallback({ responseCollect, dispatch });
    },
  },
  withdraw: {
    hidden: ({ taskDetail }: any) => {
      const withdrawFlag = formUtils.queryValue(taskDetail?.withdraw);
      return withdrawFlag;
    },
    action: async ({ dispatch }: any) => {
      const dataForSubmit = await dispatch({
        type: `${NAMESPACE}/getDataForSubmit`,
      });
      return {
        1: { businessData: dataForSubmit },
      };
    },
  },
  save: {
    timer: 30000,
    hidden: ({ taskDetail }: any) => {
      const hiddenFlag = taskDetail?.withdraw || taskDetail?.notWait;
      return hiddenFlag;
    },
    action: async ({ dispatch, isAuto }: any) => {
      const taskDetail = await dispatch({
        type: 'processTask/getTaskDetail',
      });
      const dataForSubmit = await dispatch({
        type: `${NAMESPACE}/getDataForSave`,
      });

      const dataForSave = await assembleDefaultDataForSave({
        taskDetail,
        optionType: isAuto ? EOptionType.AutoSave : EOptionType.Save,
        dataForSubmit,
        dispatch,
      });

      return {
        1: dataForSave,
      };
    },
    after: ({ taskDetail, dispatch }) => {
      if (!taskDetail || !dispatch) {
        return;
      }
      const { businessNo, caseNo, caseCategory } = taskDetail;
      // if (businessNo && caseNo && caseCategory) {
      //   dispatch({
      //     type: 'integration/getIntegrationChecklist',
      //     payload: {
      //       businessNo,
      //       caseNo,
      //       caseCategory,
      //     },
      //   });
      // }
    },
  },
  ews: {
    isShowNotice: false,
    action: ({ taskDetail }: any) => {
      const { businessNo, processInstanceId } = lodash.pick(taskDetail, [
        'businessNo',
        'processInstanceId',
      ]);
      if (businessNo) {
        window.open(`/nb/uw/ews/${businessNo}/${processInstanceId}`, '_blank');
      }
    },
  },

  appeal: {},
  sumPage: {
    action: ({ taskDetail }: any) => {
      const url = `/summary-page/${taskDetail.businessNo}/${taskDetail.processInstanceId}`;
      window.open(url);
    },
  },
  ruleResult: {
    isShowRuleResultsModal: false,
    isShowNotice: false,
    action: async ({ dispatch }: any) => {
      await dispatch({
        type: `${NAMESPACE}/getRuleResultsModal`,
      });
      await dispatch({
        type: `${NAMESPACE}/getRuleResultList`,
      });
    },
  },
  escalate: {
    action: async ({ dispatch }: any) => {
      await dispatch({
        type: `${NAMESPACE}/setEscalateModalShow`,
      });
    },
  },
  'Re-calculate': {
    // hidden: () => {
    //   return needPremRecal !== 'Y';
    // },
    validate: async ({ dispatch }: any) => {
      const sustainabilityValidate = await dispatch({
        type: `${NAMESPACE}/validateSustainability`,
        payload: {
          type: 'main'
        }
      });
      if (!sustainabilityValidate) {
        messageModal({
          typeCode: 'Label_COM_ErrorMessage',
          dictCode: 'MSG_000794',
        });
        return requestHandleType.break;
      }
    },
    action: async ({ dispatch }: any) => {
      await dispatch({
        type: `${NAMESPACE}/getCalculate`,
        payload: {
          action: Action.Recalculate,
          // TODO:这里应该区分两者
          type: OptionType.recalculateUw,
        },
      });
    },
  },
  'Re-underwrite': {
    action: async ({ dispatch }: any) => {
      await dispatch({
        type: `${NAMESPACE}/getReUw`,
        payload: {
          action: Action.ReUnderwrite,
          type: OptionType.retry,
        },
      });
    },
  },
};

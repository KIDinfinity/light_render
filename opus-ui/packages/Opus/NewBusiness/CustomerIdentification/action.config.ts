import { eOperationType } from '@/enum/eOperationType';
import { formUtils } from 'basic/components/Form';
import { EOptionType } from 'basic/enum/EOptionType';
import { assembleDefaultDataForSave } from 'basic/utils/SnapshotTool';
import lodash from 'lodash';
import { NAMESPACE } from './activity.config';
import { requestHandleType } from 'bpm/enum/requestHandleType';

export default {
  pend: {
    hidden: ({ taskDetail }: any) => {
      const hiddenFlag = taskDetail?.withdraw || taskDetail?.notWait;
      return hiddenFlag;
    },
  },
  submit: {
    validate: async ({ dispatch }: any) => {
      const errors = await dispatch({
        type: `${NAMESPACE}/validateFields`,
      });
      return lodash.isArray(errors) && errors.length ? requestHandleType.break : errors;
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
      };
      return {
        1: params,
        2: params,
        3: params,
      };
    },
    anyway: async ({ responseCollect, dispatch, taskDetail }: any) => {
      const { businessNo } = taskDetail;
      dispatch({
        type: 'navigatorInformationController/loadAllCategoryInformation',
        payload: {},
      });
      dispatch({
        type: `${NAMESPACE}/getRiskIndicator`,
        payload: { applicationNo: taskDetail.businessNo },
      });
      dispatch({
        type: `${NAMESPACE}/handleUpdateClientInfo`,
        payload: { businessNo, submitResponse: lodash.get(responseCollect, '2') },
      });
      // const errorMessages = lodash
      //   .chain(responseCollect)
      //   .values()
      //   .find((res: any) => res?.success === false)
      //   .get('promptMessages', [])
      //   .value();
      // const ageChange = lodash.some(
      //   errorMessages,
      //   (item: any) => item?.code === 'age.has.been.changed'
      // );
      // // ageChange好像没有用到
      // if (ageChange) {
      //   dispatch({
      //     type: `${NAMESPACE}/saveAgeChange`,
      //     payload: {
      //       ageChange,
      //     },
      //   });
      // }
    },
  },
  withdraw: {
    hidden: ({ taskDetail }: any) => {
      const withdrawFlag = formUtils.queryValue(taskDetail?.withdraw) || taskDetail?.notWait;
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
    action: async ({ dispatch, taskDetail, isAuto }: any) => {
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
};

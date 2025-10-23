import { useMemo } from 'react';
import { eOperationType } from '@/enum/eOperationType';
import { messageModal } from '@/utils/commonMessage';
import { formUtils } from 'basic/components/Form';
import { EOptionType } from 'basic/enum/EOptionType';
import { assembleDefaultDataForSave } from 'basic/utils/SnapshotTool';
import { requestHandleType } from 'bpm/enum/requestHandleType';
import lodash from 'lodash';
import { NAMESPACE } from './activity.config';
import { Action } from '@/components/AuditLog/Enum';
import { OptionType } from 'opus/NewBusiness/ManualUnderwriting/_enum';
import { useSelector, useDispatch } from 'dva';
import { shallowEqual } from 'react-redux';
import { Modal } from 'antd';
import { taskGoBack } from '@/utils/task';
import { formatMessageApi } from '@/utils/dictFormatMessage';

const holdInformationPromise = (dispatch: any, category: string, taskDetail: any) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: `${NAMESPACE}/setInformationModalShow`,
      payload: {
        category,
        taskDetail,
        resolve: resolve,
        reject: reject,
      },
    });
  });
};

const holdPremiumTransferPromise = (dispatch: any, taskDetail: any) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: `${NAMESPACE}/setPremiumTransferModalData`,
      payload: {
        show: true,
        taskDetail,
        resolve: resolve,
        reject: reject,
      },
    });
  });
};

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
      updateDecisionDate: () => {
        dispatch({
          type: `${NAMESPACE}/updateBusinessData`,
          payload: { updateType: 'updateDecisionDate' },
        });
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

export default () => {
  const needPremRecal = useSelector(({ [NAMESPACE]: modelnamepsace }: any) => {
    return modelnamepsace?.needPremRecal;
  }, shallowEqual);

  const failCloseEnquiry = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.processData?.failCloseEnquiry,
    shallowEqual
  );

  // const syncSuccessfully = useSelector(
  //   ({ [NAMESPACE]: modelnamepsace }: any) =>
  //     modelnamepsace?.processData?.planInfoData?.syncSuccessfully,
  //   shallowEqual
  // );

  const dispatch = useDispatch();
  return useMemo(() => {
    return {
      pend: {
        hidden: ({ taskDetail }: any) => {
          const hiddenFlag = taskDetail?.withdraw || taskDetail?.notWait;
          return hiddenFlag;
        },
      },
      submit: {
        validate: async () => {
          const sustainabilityValidate = await dispatch({
            type: `${NAMESPACE}/validateSustainability`,
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
          return lodash.isArray(errors) && errors.length ? requestHandleType.break : errors;
        },
        action: async ({ taskDetail }: any) => {
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
            4: params,
          };
        },
        after: async () => {
          return new Promise((resolve) => {
            Modal.success({
              centered: true,
              title: formatMessageApi({ Label_COM_General: 'success' }),
              content: formatMessageApi({ Label_COM_Message: 'MSG_001141' }),
              okText: formatMessageApi({ Label_BPM_Button: 'Close' }),
              onOk: () => resolve(true),
            });
          });
        },
        anyway: async ({ responseCollect, taskDetail }: any) => {
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
        // eslint-disable-next-line @typescript-eslint/no-shadow
        validate: async ({ taskDetail, dispatch }: any) => {
          try {
            await holdInformationPromise(dispatch, 'withdrawReason', taskDetail);
          } catch (err) {
            return requestHandleType.break;
          }
        },
        hidden: ({ taskDetail }: any) => {
          const withdrawFlag = formUtils.queryValue(taskDetail?.withdraw);
          return withdrawFlag;
        },
        action: async () => {
          const dataForSubmit = await dispatch({
            type: `${NAMESPACE}/getDataForSubmit`,
          });
          return {
            1: { businessData: dataForSubmit },
          };
        },
        // eslint-disable-next-line @typescript-eslint/no-shadow
        after: ({ dispatch }: any) => {
          dispatch({
            type: `${NAMESPACE}/setInformationModalShow`,
            payload: {
              cancel: true,
            },
          });
          Modal.success({
            centered: true,
            title: formatMessageApi({ Label_COM_General: 'success' }),
            content: 'You have successfully withdrawn this case.',
            okText: formatMessageApi({ Label_BPM_Button: 'Close' }),
            onOk: taskGoBack,
          });
        },
      },
      save: {
        timer: 30000,
        hidden: ({ taskDetail }: any) => {
          const hiddenFlag = taskDetail?.withdraw || taskDetail?.notWait;
          return hiddenFlag;
        },
        action: async ({ isAuto }: any) => {
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
      recal: {
        // hidden: () => {
        //   return needPremRecal !== 'Y';
        // },
        validate: async () => {
          const sustainabilityValidate = await dispatch({
            type: `${NAMESPACE}/validateSustainability`,
          });
          if (!sustainabilityValidate) {
            messageModal({
              typeCode: 'Label_COM_ErrorMessage',
              dictCode: 'MSG_000794',
            });
            return requestHandleType.break;
          }
        },
        action: async () => {
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
      reUW: {
        action: async () => {
          await dispatch({
            type: `${NAMESPACE}/getReUw`,
            payload: {
              action: Action.ReUnderwrite,
              type: OptionType.retry,
            },
          });
        },
      },
      'Re-calculate': {
        // hidden: () => {
        //   return needPremRecal !== 'Y';
        // },
        validate: async () => {
          const sustainabilityValidate = await dispatch({
            type: `${NAMESPACE}/validateSustainability`,
          });
          if (!sustainabilityValidate) {
            messageModal({
              typeCode: 'Label_COM_ErrorMessage',
              dictCode: 'MSG_000794',
            });
            return requestHandleType.break;
          }
        },
        action: async () => {
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
        action: async () => {
          await dispatch({
            type: `${NAMESPACE}/getReUw`,
            payload: {
              action: Action.ReUnderwrite,
              type: OptionType.retry,
            },
          });
        },
      },
      UWMEResult: {
        hidden: () => {
          return failCloseEnquiry !== 'Y';
        },
        action: async () => {
          await dispatch({
            type: `${NAMESPACE}/getUWResult`,
            payload: {
              action: Action.GetUWMeResult,
              type: OptionType.getUWMEResult,
            },
          });
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
        action: async () => {
          await dispatch({
            type: `${NAMESPACE}/getRuleResultsModal`,
          });
          await dispatch({
            type: `${NAMESPACE}/getRuleResultList`,
          });
        },
      },
      escalate: {
        // eslint-disable-next-line @typescript-eslint/no-shadow
        action: async ({ dispatch, taskDetail }: any) => {
          await dispatch({
            type: `${NAMESPACE}/setInformationModalShow`,
            payload: {
              category: 'EscalateReason',
              taskDetail,
            },
          });
        },
      },
      // payment transfer
      premiumTransfer: {
        disabled: true,
        // eslint-disable-next-line @typescript-eslint/no-shadow
        validate: async ({ taskDetail, dispatch }: any) => {
          try {
            await holdPremiumTransferPromise(dispatch, {
              ...taskDetail,
            });
          } catch (err) {
            return requestHandleType.break;
          }
        },
      },
    };
  }, [needPremRecal, failCloseEnquiry]);
};

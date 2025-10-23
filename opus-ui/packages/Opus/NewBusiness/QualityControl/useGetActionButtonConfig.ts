import { useMemo } from 'react';
import { messageModal } from '@/utils/commonMessage';
import { EOptionType } from 'basic/enum/EOptionType';
import { taskGoBack } from '@/utils/task';
import { assembleDefaultDataForSave } from 'basic/utils/SnapshotTool';
import getSubmitParams from 'basic/utils/getSubmitParams';
import { requestHandleType } from 'bpm/enum/requestHandleType';
import lodash from 'lodash';
import { NAMESPACE } from '../ManualUnderwriting/activity.config';
import { useDispatch, useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { Modal } from 'antd';
import { Action } from '@/components/AuditLog/Enum';
import { ButtonCode } from 'bpm/enum';
import { checkAppealAuth } from 'opus/NewBusiness/ManualUnderwriting/_utils';

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

export default () => {
  const needPremRecal = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.needPremRecal,
    shallowEqual
  );

  const failCloseEnquiry = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.processData?.failCloseEnquiry,
    shallowEqual
  );

  const auditLogExists = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.auditLogExists,
    shallowEqual
  );

  const dispatch = useDispatch();
  return useMemo(() => {
    return {
      pend: {
        hidden: ({ taskDetail }: any) => {
          const hiddenFlag = taskDetail?.withdraw || taskDetail?.notWait;
          return hiddenFlag;
        },
        after: () => {
          window.location.reload();
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
          return errors;
        },
        action: async ({ taskDetail, buttonConfig }: any) => {
          const dataForSubmit = await dispatch({
            type: `${NAMESPACE}/getDataForSubmit`,
          });
          const finalParam = getSubmitParams({
            apiList: buttonConfig?.activityButtonServiceList,
            businessData: dataForSubmit,
            taskDetail,
          });
          dispatch({
            type: 'auditLogController/logTask',
            payload: {
              action: Action.Submit,
            },
          });
          return finalParam;
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
          const errorMessages = lodash
            .chain(responseCollect)
            .values()
            .find((res: any) => res?.success === false)
            .get('promptMessages', [])
            .value();
          const ageChange = lodash.some(
            errorMessages,
            (item: any) => item?.code === 'age.has.been.changed'
          );
          // ageChange好像没有用到
          if (ageChange) {
            dispatch({
              type: `${NAMESPACE}/saveAgeChange`,
              payload: {
                ageChange,
              },
            });
          }
        },
      },
      save: {
        timer: 30000,
        hidden: ({ taskDetail }: any) => {
          const hiddenFlag = taskDetail?.withdraw || taskDetail?.notWait;
          return hiddenFlag;
        },
        action: async ({ taskDetail, isAuto }: any) => {
          if (taskDetail.policyStatus === 'IC') {
            return requestHandleType.break;
          }
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
      escalate: {
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
      qcPass: {
        hidden: () => !!auditLogExists,
        validate: async ({ taskDetail, dispatch }) => {
          try {
            await new Promise((resolve, reject) => {
              Modal.confirm({
                iconType: 'exclamation-circle',
                title: formatMessageApi({ Label_COM_Opus: 'Confirmation' }),
                content: 'Please confirm to pass this case.',
                centered: true,
                okText: formatMessageApi({ Label_BPM_Button: 'Confirm' }),
                cancelText: formatMessageApi({ Label_COM_Opus: 'cancel' }),
                onOk() {
                  resolve(true);
                },
                onCancel() {
                  reject(false);
                },
              });
            });
          } catch (err) {
            return requestHandleType.break;
          }
        },
        after: async ({ dispatch }) => {
          Modal.success({
            centered: true,
            title: formatMessageApi({ Label_COM_General: 'success' }),
            content: 'Click Close to complete the QC case.', // todo
            okText: formatMessageApi({ Label_BPM_Button: 'Close' }),
            onOk: taskGoBack,
          });
        },
      },
      qcFail: {
        disabled: () => !auditLogExists,
        validate: async ({ taskDetail, dispatch }) => {
          try {
            await holdInformationPromise(dispatch, 'QCFail', taskDetail);
          } catch (err) {
            return requestHandleType.break;
          }
        },
        after: async ({ dispatch }) => {
          Modal.success({
            centered: true,
            title: formatMessageApi({ Label_COM_General: 'success' }),
            content: formatMessageApi({ Label_COM_Message: 'MSG_001074' }, 'QC'),
            okText: formatMessageApi({ Label_BPM_Button: 'Close' }),
            onOk: taskGoBack,
          });
        },
      },
      appeal: {
        validate: async ({ taskDetail, dispatch }: any) => {
          try {
            await checkAppealAuth(taskDetail);
            await holdInformationPromise(dispatch, 'AppealNote', taskDetail);
          } catch (err) {
            return requestHandleType.break;
          }
        },
        customProcessService: async ({ data, buttonConfig, service }: any) => {
          const { buttonServiceUrl } = service;
          const { buttonCode } = buttonConfig;
          if (
            buttonCode === ButtonCode.Appeal &&
            buttonServiceUrl === '/api/navigator/cases/create'
          ) {
            const response = await dispatch({
              type: 'workspaceCases/asyncTouch',
              payload: {
                // appeal create 改用touch->getTouchResult方式，不需要传activityKey
                params: { ...data, operationType: 'asyncAppealCreate', activityKey: undefined },
              },
            });
            // defect fix, 当appeal create失败之后，需要重新打开modal才会重新触发bpm流程call api，所以此处需要关掉modal
            if ((response as any).success === false) {
              await dispatch({
                type: `${NAMESPACE}/setInformationModalShow`,
                payload: {
                  cancel: true,
                },
              });
            }
            // processed返回true，这个接口接下来就不会被bpm call了
            return Promise.resolve({ processed: true, response });
          }

          return Promise.resolve({ processed: false });
        },
        action: async () => {
          const dataForSubmit = await dispatch({
            type: `${NAMESPACE}/getDataForSubmit`,
          });

          return {
            1: {},
            2: { businessData: dataForSubmit },
          };
        },
        after: async ({ dispatch }) => {
          Modal.success({
            centered: true,
            title: formatMessageApi({ Label_COM_General: 'success' }),
            content: 'You have successfully reopened this case.', // todo
            okText: formatMessageApi({ Label_BPM_Button: 'Close' }),
            onOk: taskGoBack,
          });
        },
      },
    };
  }, [needPremRecal, failCloseEnquiry, auditLogExists]);
};

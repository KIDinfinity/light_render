import { useDispatch } from 'dva';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import notice from 'bpm/pages/OWBEntrance/Sider/ButtonAction/notice';
import {
  handleWarnMessageModal,
  handleErrorMessageIgnoreXErrorNotice,
} from '@/utils/commonMessage';
import { Action } from '@/components/AuditLog/Enum';
import logButton from '@/components/AuditLog/API/logButton';
import useClientAsyncSubmit from 'basic/hooks/useClientAsyncSubmit';
import useHandleProposalClientChange from 'process/NB/ManualUnderwriting/_hooks/useHandleProposalClientChange';
import { history } from 'umi';
import addUpdateDate from '@/utils/addUpdateDate';
import usePublishEnvoyRefresh from '@mc/hooks/usePublishEnvoyRefresh';

export default ({ bpmDispatch, taskDetail, editable }: any) => {
  const dispatch = useDispatch();
  const handlePublishEnvoyRefresh = usePublishEnvoyRefresh();
  const handleSubmit = useClientAsyncSubmit({
    requestInterval: 1000,
    requestTimeLimit: 1000 * 60 * 3,
    taskId: taskDetail?.taskId,
  });
  const handleProposalChange = useHandleProposalClientChange();
  if (!editable) {
    return [
      {
        buttonCode: 'back',
        title: formatMessageApi({ Label_BPM_Button: 'back' }),
        action: () => {
          history.back();
        },
      },
    ];
  }
  return [
    {
      buttonCode: 'save',
      action: async () => {
        dispatch({
          type: 'auditLogController/logTask',
          payload: {
            action: Action.Save,
            activityKey: formatMessageApi({ Label_BPM_Button: 'proposalChange' }),
          },
        });

        const response = await dispatch({
          type: 'manualUnderwriting/savePerposal',
        });
        if (response?.success) {
          await addUpdateDate(taskDetail?.processInstanceId);
          notice({
            buttonCode: 'save',
          });
        }
      },
      after: () => {
        console.log('run');
      },
    },
    {
      buttonCode: 'discard',
      action: async () => {
        handleWarnMessageModal(
          [
            {
              content: formatMessageApi({
                Label_COM_WarningMessage: 'MSG_000535',
              }),
            },
          ],
          {
            okFn: async () => {
              const response = await dispatch({
                type: 'manualUnderwriting/discard',
              });

              if (response?.success) {
                notice({
                  buttonCode: 'discard',
                });
              }
              dispatch({
                type: `manualUnderwriting/deleteDiffSourceSnapshot`,
              });
              dispatch({
                type: 'global/visitTaskDetail',
                payload: {
                  taskId: taskDetail?.taskId,
                },
              });
            },
            cancelFn: () => {},
          }
        );
      },
    },
    {
      buttonCode: 'confirm',
      action: async () => {
        await dispatch({
          type: 'manualUnderwriting/addFundTotalError',
          payload: {
            totalError: true,
          },
        });

        const errors = await dispatch({
          type: 'manualUnderwriting/validateFields',
        });

        if (errors?.length) {
          bpmDispatch({
            type: 'setButtonCodeErrorsCount',
            payload: {
              buttonCode: 'confirm',
              errorsCount: errors?.length,
            },
          });
          bpmDispatch({
            type: 'setButtonStatus',
            payload: {
              buttonCode: 'confirm',
              status: 'error',
              errorsCount: errors?.length,
            },
          });
          return false;
        }
        const validatePerposal = await dispatch({
          type: 'manualUnderwriting/validatePerposal',
        });
        let validateProduct: any = true;
        validateProduct = await dispatch({
          type: 'manualUnderwriting/validateProduct',
        });
        if (!validatePerposal || !validateProduct) {
          return false;
        }
        const isBreak = await handleProposalChange();
        if (isBreak) {
          return false;
        }
        await dispatch({
          type: `manualUnderwriting/updateEditedInProposalChange`,
        });
        const confirmData = await dispatch({
          type: 'manualUnderwriting/getConfirmPerposalData',
        });
        const response = await handleSubmit({
          params: confirmData,
        });
        // const response: any = await dispatch({
        //   type: 'manualUnderwriting/confirmPerposal',
        // });
        const { success } = lodash.pick(response, ['success']);
        if (success) {
          notice({
            buttonCode: 'confirm',
          });
          dispatch({ type: 'insured360/getCustomerTypeConfig' });
          await logButton({
            caseNo: taskDetail?.processInstanceId,
            activityKey: formatMessageApi({ Label_BPM_Button: 'proposalChange' }),
            buttonCode: 'confirm',
            dispatch,
          });
          dispatch({
            type: 'global/visitTaskDetail',
            payload: {
              taskId: taskDetail?.taskId,
            },
          });
          dispatch({
            type: `manualUnderwriting/deleteDiffSourceSnapshot`,
          });
          await dispatch({
            type: 'task/updateVersion',
            payload: { taskId: taskDetail?.taskId },
          });
          await addUpdateDate(taskDetail?.processInstanceId);
          handlePublishEnvoyRefresh();
        }
        if (!success) {
          handleErrorMessageIgnoreXErrorNotice(response);
        }
      },
    },
  ];
};

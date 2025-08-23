import lodash from 'lodash';
import { history } from 'umi';
import { formUtils } from 'basic/components/Form';
import { getSubmitData } from '@/utils/modelUtils/nbUtils';
import { assembleDefaultDataForSave } from 'basic/utils/SnapshotTool';
import { EOptionType } from 'basic/enum/EOptionType';
import { NAMESPACE } from './activity.config';
import { handleWarnMessageModal } from '@/utils/commonMessage';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { messageModal } from '@/utils/commonMessage';
import { requestHandleType } from 'bpm/enum/requestHandleType';

export default {
  submit: {
    validate: async ({ dispatch }: any) => {
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
    action: async ({ taskDetail, dispatch }: any) => {
      const dataForSubmit = await dispatch({
        type: `${NAMESPACE}/getDataForSubmit`,
      });
      return {
        1: dataForSubmit,
        2: getSubmitData({
          taskDetail,
          dataForSubmit,
        }),
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
        1: dataForSubmit,
      };
    },
  },
  save: {
    timer: 30000,
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
  },

  proposalChange: {
    action: async ({ taskDetail, dispatch }: any) => {
      const dataForSubmit = await dispatch({
        type: `${NAMESPACE}/getDataForSave`,
      });
      const dataForSave = await assembleDefaultDataForSave({
        taskDetail,
        optionType: EOptionType.proposalChange,
        dataForSubmit: { ...dataForSubmit, isProposalChange: true },
        dispatch,
      });
      return {
        1: dataForSave,
      };
    },
    after: async ({ taskDetail, dispatch }: any) => {
      const sustainabilityValidate = await dispatch({
        type: `${NAMESPACE}/validateSustainability`,
      });

      if (!sustainabilityValidate) {
        const isBreak = await new Promise((resolve) => {
          handleWarnMessageModal(
            [
              {
                content: formatMessageApi({
                  Label_COM_ErrorMessage: 'MSG_000793',
                }),
              },
            ],
            {
              okFn: () => {
                resolve(false);
              },
              cancelFn: () => {
                resolve(false);
              },
            }
          );
        });

        if (!isBreak) {
          dispatch({
            type: `${NAMESPACE}/deleteSustainabilityOptionsSnashot`,
          });
          dispatch({
            type: `${NAMESPACE}/setSustainabilityModalBtnVisable`,
            payload: {
              sustainabilityModalBtnVisible: false,
            },
          });

          history.push(`/nb/uw/proposal/${taskDetail?.taskId}`);
        }
      } else {
        history.push(`/nb/uw/proposal/${taskDetail?.taskId}`);
      }
    },
    isShowNotice: false,
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
    isShowNotice: false,
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
};

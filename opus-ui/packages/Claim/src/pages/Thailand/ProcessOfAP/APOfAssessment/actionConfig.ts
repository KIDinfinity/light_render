import { assembleDefaultDataForSave } from 'basic/utils/SnapshotTool';
import { messageModal } from '@/utils/commonMessage';
import { EOptionType } from 'basic/enum/EOptionType';
import bpm from 'bpm/pages/OWBEntrance';
import checkInvoice from 'claim/pages/utils/checkInvoice';
import { requestHandleType } from 'bpm/enum/requestHandleType';
import { getSubmitData as getDataForSubmit } from '@/utils/modelUtils/claimUtils';
import windowOpenFn from '@/utils/windowOpenFn';
import lodash from 'lodash';

const notApproval = (taskDefKey: any) => taskDefKey !== 'CP_ACT004';

const cliaimDataIsEmpty = (dataForSubmit: any) =>
  !lodash.isObject(dataForSubmit) &&
  dataForSubmit.toString() === requestHandleType.break.toString();

const getSubmitData = async (dispatch, taskDetail) => {
  const { taskDefKey, taskId, processInstanceId } = taskDetail;

  const claimData = await dispatch({
    type: 'apOfClaimAssessmentController/getDataForSubmit',
  });
  if (lodash.isEmpty(claimData)) {
    return requestHandleType.break;
  }
  const dataForSubmit = {
    ...claimData,
    taskId,
    processInstanceId,
    variables: {},
  };
  let submitData = {};

  if (notApproval(taskDefKey)) {
    const followUpInquiryNoClaimList = await dispatch({
      type: 'followUpClaim/setInquiryNoClaimList',
    });
    submitData = {
      ...dataForSubmit,
      ...followUpInquiryNoClaimList,
    };
    // AP category 流程，根据treatment 中是否有invoice 做判断， 无invoice 时，claimCase.assess_opertaion 赋值为“only_assess”
    submitData.assessOperation = checkInvoice(submitData);
  } else {
    submitData = dataForSubmit;
  }

  // 前端提交数据时置空notificationList
  delete submitData.notificationList;

  return submitData;
};

export default {
  submit: {
    validate: async ({ dispatch }: any) => {
      await dispatch({
        type: 'formCommonController/handleSubmited',
      });
      const errors = await dispatch({
        type: 'apOfClaimAssessmentController/validateFields',
      });

      if (errors?.length) {
        return errors;
      }
      const isSame = await dispatch({
        type: 'claimCaseController/compareClaimDataV2',
        payload: {
          targetDataPath: 'apOfClaimAssessmentController/getDenormalizedClaimData',
        },
      });
      if (!isSame) {
        // eslint-disable-next-line no-return-await
        return await new Promise((resolve) => {
          messageModal(
            {
              typeCode: 'Label_COM_WarningMessage',
              dictCode: 'WRN_000038',
            },
            {
              okFn: async () => {
                resolve(errors);
              },
              cancelFn: () => {
                bpm.clearSubmitButtonErrors();
                resolve(requestHandleType.break);
              },
            }
          );
        }).then((result) => {
          return result;
        });
      }
    },
    action: async ({ dispatch, taskDetail, allveriables }: any) => {
      const dataForSubmit = await getSubmitData(dispatch, taskDetail);

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

      const actionObj = notApproval(taskDefKey)
        ? {
            1: dataForBaseInfoParam,
            2: cliaimDataIsEmpty(dataForSubmit)
              ? dataForSubmit
              : getDataForSubmit({ taskDetail, dataForSubmit, variables: allveriables[0] }),
          }
        : {
            2: cliaimDataIsEmpty(dataForSubmit)
              ? dataForSubmit
              : getDataForSubmit({ taskDetail, dataForSubmit, variables: allveriables[1] }),
          };

      return actionObj;
    },
    after: ({ dispatch }: any) => {
      dispatch({
        type: 'followUpClaim/saveSnapshot',
      });
    },
  },
  save: {
    timer: 30000,
    action: async ({ dispatch, taskDetail, isAuto }: any) => {
      const dataForSubmit = await getSubmitData(dispatch, taskDetail);

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
    action: async ({ dispatch, taskDetail }: any) => {
      const { taskId } = taskDetail;
      return {
        1: { taskId },
        2: { taskId },
        3: await getSubmitData(dispatch, taskDetail),
      };
    },
    after: ({ dispatch }: any) => {
      dispatch({
        type: 'followUpClaim/saveSnapshot',
      });
    },
  },
  image: {
    action: ({ taskDetail }: any) => {
      const caseNo = taskDetail?.processInstanceId;
      window.open(`/documentManage/${caseNo}`);
    },
    after: ({ responseCollect }: any) => {
      const url = lodash.get(responseCollect, '1.resultData');
      if (url) windowOpenFn(url);
    },
    isShowNotice: false,
  },
};
